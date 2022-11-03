module samplers


using Distributions, LinearAlgebra
using StatsBase
using Printf
using CSV
using DataFrames
using DataStructures
using ProgressMeter
using PrettyTables

include("outFiles.jl")
include("misc.jl")
include("runTime.jl")

export runSampler!

#main sampler
function runSampler!(ycorr,nData,dfE,scaleE,X,iXpX,XKeyPos,b,Z,iVarStr,Zp,zpz,uKeyPos,uKeyPos4Print,nColEachZ,u,varU,scaleZ,dfZ,M,Mp,mpm,BetaKeyPos,BetaKeyPos4Print,beta,regionArray,nRegions,varBeta,scaleM,dfM,chainLength,burnIn,outputFreq,outPut)
		
	#output settings
	these2Keep  = collect((burnIn+outputFreq):outputFreq:chainLength) #print these iterations        

	#Start McMC
@showprogress 1 "MCMC progress..." for iter in 1:chainLength
	
		#sample residual variance
	       	varE = sampleVarE(dfE,scaleE,ycorr,nData)
		
		#sample fixed effects

		for xSet in keys(iXpX)
			sampleX!(xSet,X[xSet],b,iXpX[xSet],XKeyPos[xSet],ycorr,varE)
		end
	
		#sample random effects
	        sampleZandZVar!(iVarStr,Z,Zp,u,zpz,uKeyPos,nColEachZ,ycorr,varE,varU,scaleZ,dfZ)	

		#sample marker effects and variances
	
		
		for mSet in keys(mpm)
			sampleMandMVar!(mSet,M[mSet],Mp[mSet],beta,mpm[mSet],BetaKeyPos[mSet],regionArray[mSet],nRegions[mSet],ycorr,varE,varBeta,scaleM[mSet],dfM[mSet])
		end
               		
        	#print
		if iter in these2Keep
			IO.outMCMC(outPut,"b",vcat(b...)') ### currently no path is provided!!!!
			IO.outMCMC(outPut,"varE",varE)
			
			for zSet in keys(uKeyPos4Print)
                                IO.outMCMC(outPut,"u$(uKeyPos4Print[zSet])",u[uKeyPos4Print[zSet],1:nColEachZ[zSet]]')
                        end
			for pSet in keys(zpz)
				IO.outMCMC(outPut,"varU$(uKeyPos[pSet])",varU[pSet]) #join values for multivariate in uKeyPos[pSet])
			end
			

			for mSet in keys(BetaKeyPos4Print)
				IO.outMCMC(outPut,"beta$mSet",beta[BetaKeyPos4Print[mSet]])
                        end

			for pSet in keys(mpm)
				IO.outMCMC(outPut,"var$(pSet)",hcat(reduce(hcat,varBeta[pSet])...))
			end
		end
	end
end


#Sampling fixed effects
function sampleX!(xSet,xMat::Array{Float64, 1},b,ixpx,pos,ycorr,varE)
        #block for each effect
		ycorr    .+= xMat.*b[pos]
		rhs      = xMat'*ycorr
		meanMu   = ixpx*rhs			
                b[pos] .= rand(Normal(meanMu[],sqrt((ixpx*varE))[]))
		ycorr    .-= xMat.*b[pos]        
end

function sampleX!(xSet,xMat::Array{Float64, 2},b,ixpx,pos,ycorr,varE)
        #block for each effect
		ycorr    .+= xMat*b[pos]
                rhs      = xMat'*ycorr
                meanMu   = ixpx*rhs
		b[pos] .= rand(MvNormal(vec(meanMu),convert(Array,Symmetric(ixpx*varE))))
		ycorr    .-= xMat*b[pos]
end

#sample random effects
function sampleU(iMat,pos,ZComp,ZpComp,zpzComp,varE,varUComp,uVector,ycorr)
	uVec = deepcopy(uVector)
	λz = varE/varUComp
	Yi = ZpComp*ycorr #computation of Z'ycorr for ALL  rhsU
	nCol = length(zpzComp)
	for i in 1:nCol
        	uVec[i] = 0.0 #also excludes individual from iMat! Nice trick.
		rhsU = Yi[i] - λz*dot(iMat[:,i],uVec)
                lhsU = zpzComp[i] + (iMat[i,i]*λz)[1]
		invLhsU = 1.0/lhsU
                meanU = invLhsU*rhsU
                uVec[i] = rand(Normal(meanU,sqrt(invLhsU*varE)))
        end
	return uVec
end


function sampleZandZVar!(iStrMat,ZMat,ZpMat,u,zpzMat,keyU,nCols,ycorr,varE,varU,scaleZ,dfZ)
        #for each random effect
        for zSet in keys(zpzMat)
		if isa(zSet,Tuple)
			uPos = keyU[zSet]
			nowZp = ZpMat[zSet] ###
			error("correlated random effects are not allowed")
		elseif isa(zSet,Symbol) || isa(zSet,Expr)
                	uPos = keyU[zSet]
			ycorr .+= ZMat[zSet]*u[uPos,1:nCols[zSet]]
                	u[uPos,1:nCols[zSet]]  .= sampleU(iStrMat[zSet],uPos,ZMat[zSet],ZpMat[zSet],zpzMat[zSet],varE,varU[zSet],u[uPos,1:nCols[zSet]],ycorr)
			ycorr .-= ZMat[zSet]*u[uPos,1:nCols[zSet]]		
			varU[zSet] = sampleVarU(iStrMat[zSet],scaleZ[zSet],dfZ[zSet],u[uPos,1:nCols[zSet]])
       		end
		
	 end
end


#sample random marker effects

##### Component-wise, seperated functions for symbol and tuple


function sampleMandMVar!(mSet::Symbol,MMat,nowMp,beta,mpmMat,betaPos,regionsMat,regions,ycorr,varE,varBeta,scaleMNow,dfMNow)
	local rhs::Float64
	local lhs::Float64
	local meanBeta::Float64
	for r in 1:regions
		theseLoci = regionsMat[r]
		regionSize = length(theseLoci)
		lambda = varE/(varBeta[mSet][r])
		for locus in theseLoci::UnitRange{Int64}
			BLAS.axpy!(getindex(beta[betaPos],locus),view(MMat,:,locus),ycorr)
			rhs = BLAS.dot(view(MMat,:,locus),ycorr)
			lhs = mpmMat[locus] + lambda
			meanBeta = lhs\rhs
			setindex!(beta[betaPos],sampleBeta(meanBeta, lhs, varE),locus)
			BLAS.axpy!(-1.0*getindex(beta[betaPos],locus),view(MMat,:,locus),ycorr)
		end
		varBeta[mSet][r] = sampleVarBeta(scaleMNow,dfMNow,getindex(beta[betaPos],theseLoci),regionSize)
	end
end

##### Component-wise, seperated functions for symbol and tuple
function sampleMandMVar!(mSet::Tuple,MMat,nowMp,beta,mpmMat,betaPos,regionsMat,regions,ycorr,varE,varBeta,scaleMNow,dfMNow)
	for r in 1:regions
		theseLoci = regionsMat[r]
		regionSize = length(theseLoci)
		invB = inv(varBeta[mSet][r])
		for locus in theseLoci::UnitRange{Int64}
			RHS = zeros(size(invB,1))	
			ycorr .+= MMat[locus]*getindex.(beta[betaPos],locus)				
			RHS = (nowMp[locus]*ycorr)./varE
			invLHS::Array{Float64,2} = inv((mpmMat[locus]./varE) .+ invB)
			meanBETA::Array{Float64,1} = invLHS*RHS
			setindex!.(beta[betaPos],rand(MvNormal(meanBETA,convert(Array,Symmetric(invLHS)))),locus)
			ycorr .-= MMat[locus]*getindex.(beta[betaPos],locus)	
		end
		varBeta[mSet][r] = sampleVarCovBeta(scaleMNow,dfMNow,reduce(hcat,getindex.(beta[betaPos],Ref(theseLoci))),regionSize)
	end
end

#####



#sample marker effects
function sampleBeta(meanBeta, lhs, varE)
    return rand(Normal(meanBeta,sqrt(lhs\varE)))
end

#sample random effects' variances (new U)
function sampleVarU(iMat,scale_ranVar,df_ranVar,effVec)
	n = size(iMat,2)
	return (scale_ranVar*df_ranVar + effVec'*iMat*effVec)/rand(Chisq(df_ranVar + n))
end

#sample marker variances
function sampleVarBeta(scalem,dfm,whichLoci,regionSize)::Float64
	return (scalem*dfm + BLAS.dot(whichLoci,whichLoci)) / rand(Chisq(dfm + regionSize))
end

function sampleVarCovBeta(scalem,dfm,whichLoci,regionSize)
	Sb = whichLoci'whichLoci
	return rand(InverseWishart(dfm + regionSize, scalem + Sb))
end

#Sample residual variance
function sampleVarE(df_e,S_e,yCorVec,nRecords)
    return (df_e*S_e + BLAS.dot(yCorVec,yCorVec))/rand(Chisq(df_e + nRecords))
end



end
