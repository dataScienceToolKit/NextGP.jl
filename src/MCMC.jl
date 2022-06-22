module MCMC

export runGibbs

using DataFrames
using CategoricalArrays
using StatsModels
using MixedModels
using Distributions,LinearAlgebra #samplers
using StatsBase
using Printf



include("equations.jl")
include("runTime.jl")
include("samplers.jl")


runGibbs = function(formula,userData,nChain,nBurn,nThin;myHints=Dict{Symbol,Any}(),blockThese=[],outFolder="outMCMC",VCV=[],userPedData=[],map=[],genotypes...)
	println("Building parts of MME")
	idY,A,yVec,FE,RE,ME,regionSizes = equations.mme(formula,userData,userHints=myHints,blocks=blockThese,path2ped=userPedData,paths2geno=genotypes)
	println("Running MCMC")

	if isdir(outMCMC)==true
		println("Default output folder $outMCMC exists. Removing its content")
    		run(`rm -rf $outMCMC/'*'`)
	else
    		println("$outMCMC has been created to store the MCMC output")
    		run(`mkdir $outMCMC`)
	end
        samplers.runSampler(idY,A,yVec,FE,RE,nChain,nBurn,nThin,VCV,ME,map,regionSizes,outFolder)
	#return(yVec,FE,RE,ME)
end

end
