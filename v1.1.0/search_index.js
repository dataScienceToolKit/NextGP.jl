var documenterSearchIndex = {"docs":
[{"location":"home/#About","page":"Home","title":"About","text":"","category":"section"},{"location":"home/#What-is-available","page":"Home","title":"What is available","text":"","category":"section"},{"location":"home/","page":"Home","title":"Home","text":"Currently, only univariate analysis are implemented\nRely on StatsModels.jl package for model formulation and fixed effects definitions\nAny kind of random effects including random marker effects                                 \nAdditive genetic effects\nMaternal effects\nPermanent environmental effects\nBayesian whole-genome regression methods\nBayesPR (BayesA<->BRR)\nBayesB\nBayesC\nBayesR\nBayesLV\nCorrelated marker effects (only for BayesPR)\nUnknown (co)variance components (e.g., marker,additive genetic,residual...)\nIt is users responsibility to make sure that the order of the individuals in the data sets aligns","category":"page"},{"location":"home/#Pkg-Registry","page":"Home","title":"Pkg Registry","text":"","category":"section"},{"location":"home/","page":"Home","title":"Home","text":"To install the latest official version, please use the following standard Julia command.","category":"page"},{"location":"home/","page":"Home","title":"Home","text":"using Pkg\npkg> Pkg.add(\"NextGP\")","category":"page"},{"location":"home/#Unstable","page":"Home","title":"Unstable","text":"","category":"section"},{"location":"home/","page":"Home","title":"Home","text":"To install the latest unofficial version (0.2.0), please use the following.","category":"page"},{"location":"home/","page":"Home","title":"Home","text":"using Pkg\npkg> Pkg.add(url = \"https://github.com/datasciencetoolkit/NextGP.jl\", rev=\"dev_0.2.0\")","category":"page"},{"location":"BWGR/BWGR/#Bayesian-whole-genome-regression","page":"BWGR","title":"Bayesian whole genome regression","text":"","category":"section"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":"using DataFrames, CSV, StatsModels, StatsBase, NextGP","category":"page"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":"path2Data = \"../data/\"","category":"page"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":"pheno = CSV.read(path2Data*\"pheno$(Pop)_ref\",DataFrame)","category":"page"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":"f = @formula(y ~ 1 + SNP(M,\"../data/pureGenoHOL_ref\",\"../data/map.txt\"))","category":"page"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":"FormulaTerm\nResponse:\n  y(unknown)\nPredictors:\n  1\n  (M)->SNP(M, \"../data/pureGenoHOL_ref\", \"../data/map.txt\")","category":"page"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":"priorVar = Dict(:M => BayesPR(9999,0.001),\n                :e => Random(\"I\",150.0));","category":"page"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":"runLMEM(f,pheno,50000,10000,10;VCV=priorVar)","category":"page"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":" ---------------- Summary of input ---------------- \n\n|Variable   Term                  Type              Levels  |\n|----------|---------------------|-----------------|--------|\n| 1        | ConstantTerm{Int64} | Vector{Float64} | 1      |\n| M        | Marker Effect              | Matrix{Float64} | 12414  |\n\nprior var-cov structure for \"e\" is either empty or \"I\" was given. An identity matrix will be used\n\n ---------------- Summary of analysis ---------------- \n\n|Effect   Type              Str          df    scale   |\n|--------|-----------------|------------|-----|--------|\n| M      | Random (Marker) | 1 block(s) | 4.0 | 0.0005 |\n| e      | Random          | I          | 4.0 | 75.0   |","category":"page"},{"location":"BWGR/BWGR/","page":"BWGR","title":"BWGR","text":"MCMC progress... 100%|███████████████████████████████████| Time: 0:10:16","category":"page"},{"location":"citation/#Citation-and-further-reading","page":"Citation","title":"Citation and further reading","text":"","category":"section"},{"location":"citation/","page":"Citation","title":"Citation","text":"This is not a list of papers for citing NextGP\nTo cite NextGP, please use something like:\n\"Analysis were carried out in Julia (Bezanson et al., 2017) using NextGP package (https://github.com/datasciencetoolkit/NextGP.jl)\"\nA list of relevant papers you may consider to cite, for the methodolgy behind BOA models, is:\nA Guillenea, G Su, MS Lund, E Karaman. Genomic prediction in Nordic Red dairy cattle considering breed origin of alleles. Journal of Dairy Science, 2022\nE Karaman, G Su, I Croue, MS Lund. Genomic prediction using a reference population of multiple pure breeds and admixed individuals. Genetics Selection Evolution, 2021.\nE Karaman, MS Lund, G Su. Multi-trait single-step genomic prediction accounting for heterogeneous (co) variances over the genome. Heredity, 2020\nOther interesting papers\nH Cheng,  K Kizilkaya,  J Zeng,  D Garrick,  R Fernando. Genomic prediction from multiple-trait Bayesian regression methods using mixture priors. Genetics, 2018. \nJ Zeng , D Garrick, J Dekkers, R Fernando. A nested mixture model for genomic prediction using whole-genome SNP genotypes. PLoS One, 2018.\nD Gianola,  G de los Campos,  WG Hill,  E Manfredi, R Fernando. Additive genetic variability and the Bayesian alphabet. Genetics, 2009","category":"page"},{"location":"Example/Example/#Simple-example","page":"Example","title":"Simple example","text":"","category":"section"},{"location":"Example/Example/","page":"Example","title":"Example","text":"Original source for the example data and code from StatsModels.jl","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"using Pkg\nPkg.add([\"GLM\",\"DataFrames\",\"StatsModels\",\"StableRNGs\"])","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"using NextGP,GLM,DataFrames,StatsModels,StableRNGs","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"rng = StableRNG(1)","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"data = DataFrame(a = rand(rng, 100), b = repeat([\"d\", \"e\", \"f\", \"g\"], 25))","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"f = @formula(y ~ 1 + a*b)","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"FormulaTerm\nResponse:\n  y(unknown)\nPredictors:\n  1\n  a(unknown)\n  b(unknown)\n  a(unknown) & b(unknown)","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"X = StatsModels.modelmatrix(f.rhs, data)","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"100×8 Matrix{Float64}:\n 1.0  0.585195   0.0  0.0  0.0  0.0        0.0       0.0\n 1.0  0.0773379  1.0  0.0  0.0  0.0773379  0.0       0.0\n 1.0  0.716628   0.0  1.0  0.0  0.0        0.716628  0.0\n 1.0  0.320357   0.0  0.0  1.0  0.0        0.0       0.320357\n 1.0  0.653093   0.0  0.0  0.0  0.0        0.0       0.0\n 1.0  0.236639   1.0  0.0  0.0  0.236639   0.0       0.0\n 1.0  0.709684   0.0  1.0  0.0  0.0        0.709684  0.0\n 1.0  0.557787   0.0  0.0  1.0  0.0        0.0       0.557787\n 1.0  0.05079    0.0  0.0  0.0  0.0        0.0       0.0\n 1.0  0.236782   1.0  0.0  0.0  0.236782   0.0       0.0\n 1.0  0.943741   0.0  1.0  0.0  0.0        0.943741  0.0\n 1.0  0.445671   0.0  0.0  1.0  0.0        0.0       0.445671\n 1.0  0.763679   0.0  0.0  0.0  0.0        0.0       0.0\n ⋮                              ⋮                    \n 1.0  0.353296   0.0  0.0  0.0  0.0        0.0       0.0\n 1.0  0.907042   1.0  0.0  0.0  0.907042   0.0       0.0\n 1.0  0.717283   0.0  1.0  0.0  0.0        0.717283  0.0\n 1.0  0.851064   0.0  0.0  1.0  0.0        0.0       0.851064\n 1.0  0.569462   0.0  0.0  0.0  0.0        0.0       0.0\n 1.0  0.906529   1.0  0.0  0.0  0.906529   0.0       0.0\n 1.0  0.932768   0.0  1.0  0.0  0.0        0.932768  0.0\n 1.0  0.77753    0.0  0.0  1.0  0.0        0.0       0.77753\n 1.0  0.925382   0.0  0.0  0.0  0.0        0.0       0.0\n 1.0  0.937514   1.0  0.0  0.0  0.937514   0.0       0.0\n 1.0  0.84156    0.0  1.0  0.0  0.0        0.84156   0.0\n 1.0  0.466776   0.0  0.0  1.0  0.0        0.0       0.466776","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"β_true = 1:8","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"1:8","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"ϵ = randn(rng, 100)*0.1","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"100-element Vector{Float64}:\n -0.11257663999051981\n -0.04855707240218229\n -0.0399617624206561\n -0.16500551655778287\n  0.017005679664480765\n  0.01860345135093398\n  0.03320283629834307\n  0.002875237903461964\n  0.0333246819881755\n  0.015944634788139227\n -0.08720613045942338\n  0.302274895906956\n -0.010746528410620624\n  ⋮\n  0.09683931334352658\n -0.04076701556861236\n -0.01377136625600546\n  0.008515556553239326\n  0.10834512810520253\n  0.020869213752181412\n  0.06983111864518227\n -0.09083213948532265\n  0.0475969402168389\n -0.1240217493387496\n  0.0007578903320709712\n -0.22771821504299466","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"data.y = X*β_true .+ ϵ;","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"f = @formula(y ~ 1 + a + b)","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"FormulaTerm\nResponse:\n  y(unknown)\nPredictors:\n  1\n  a(unknown)\n  b(unknown)","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"#Fit the modell with GLM package\nmod = fit(LinearModel, f, data)","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"StatsModels.TableRegressionModel{LinearModel{GLM.LmResp{Vector{Float64}}, GLM.DensePredChol{Float64, LinearAlgebra.CholeskyPivoted{Float64, Matrix{Float64}}}}, Matrix{Float64}}\n\ny ~ 1 + a + b\n\nCoefficients:\n────────────────────────────────────────────────────────────────────────\n                Coef.  Std. Error      t  Pr(>|t|)  Lower 95%  Upper 95%\n────────────────────────────────────────────────────────────────────────\n(Intercept)  -1.38792    0.237816  -5.84    <1e-07   -1.86004  -0.915794\na             6.8692     0.321658  21.36    <1e-37    6.23063   7.50777\nb: e          6.00763    0.252027  23.84    <1e-41    5.50729   6.50797\nb: f          7.64916    0.253326  30.19    <1e-49    7.14625   8.15208\nb: g          8.78399    0.251674  34.90    <1e-55    8.28435   9.28362\n────────────────────────────────────────────────────────────────────────","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"#=StatsModels.DummyCoding() is default. \nSee StatsModels.jl documentation for alternatives\nmyHints = Dict(:b => StatsModels.FullDummyCoding())\n=#\n\npriorVar = Dict(:e => ([],0.01))\n\nrunLMEM(f,data,100000,20000,10;VCV=priorVar)","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"Output folder outMCMC exists. Removing its content\n\n ---------------- Summary of input ---------------- \n\n|Variable   Term                  Type              Levels\n|----------|---------------------|-----------------|--------|\n| 1        | ConstantTerm{Int64} | Vector{Float64} | 1      |\n| a        | Term                | Vector{Float64} | 1      |\n| b        | Term                | Matrix{Float64} | 3      |\n\u001b[32mprior var-cov structure for \"e\" is either empty or \"I\" was given. An identity matrix will be used\u001b[39m\n\n ---------------- Summary of analysis ---------------- \n\n|Effect   Type     Str   df    scale\n|--------|--------|-----|-----|-------|\n| e      | Random | I   | 4.0 | 0.005 |","category":"page"},{"location":"Example/Example/","page":"Example","title":"Example","text":"postmean_b = summaryMCMC(\"b\")","category":"page"},{"location":"BayesLV/BayesLV/#Bayesian-log-linear-variance-model","page":"BayesLV","title":"Bayesian log-linear variance model","text":"","category":"section"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"using DataFrames, CSV, StatsModels, StatsBase, NextGP","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"path2Data = \"../data/\"","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"pheno = CSV.read(\"../data/pheno_ref\",DataFrame)","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"f = @formula(y ~ 1 + SNP(M,\"../data/geno_ref\"))","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"FormulaTerm\nResponse:\n  y(unknown)\nPredictors:\n  1\n  (M)->SNP(M, \"../data/geno_ref\")","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"data_LV = CSV.read(\"../data/GWAS_ref\",DataFrame)","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"f_LV = @formula(0 ~ x1 + x2)","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"FormulaTerm\nResponse:\n  0\nPredictors:\n  x1(unknown)\n  x2(unknown)","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"priorVar = Dict(:M => BayesLV(0.001,f_LV,data_LV),\n                :e => Random(\"I\",150.0));","category":"page"},{"location":"BayesLV/BayesLV/","page":"BayesLV","title":"BayesLV","text":"runLMEM(f,pheno,50000,10000,10;VCV=priorVar)","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/#Multiple-marker-sets","page":"Multiple marker sets","title":"Multiple marker sets","text":"","category":"section"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"using DataFrames, CSV, StatsModels, StatsBase, NextGP","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"myHints = Dict(:lact => StatsModels.FullDummyCoding(),\n               :herd => StatsModels.FullDummyCoding())","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"Dict{Symbol, StatsModels.FullDummyCoding} with 3 entries:\n  :herd => FullDummyCoding()\n  :lact => FullDummyCoding()","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"f = @formula(y ~ 1 + lact + herd + dim + wilmink + SNP(A,\"arc.txt\") + SNP(B,\"bac.txt\"))","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"FormulaTerm\nResponse:\n  y(unknown)\nPredictors:\n  1\n  lact(unknown)\n  herd(unknown)\n  dim(unknown)\n  wilmink(unknown)\n  (A)->SNP(A, \"arc.txt\")\n  (B)->SNP(B, \"bac.txt\")","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"blk = [(Symbol(1),:lact,:herd)]","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"1-element Vector{Tuple{Symbol, Symbol}}:\n (Symbol(\"1\"), :lact)","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"priorVar = Dict(:A => BayesPR(9999,0.04),\n                :B => BayesPR(9999,0.04),\n                :e => Random(\"I\",2500.0));","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":"runLMEM(f,pheno,5000,500,10;VCV=priorVar,myHints=myHints,blockThese=blk)","category":"page"},{"location":"MultipleMarkerSets/MultipleMarkerSets/","page":"Multiple marker sets","title":"Multiple marker sets","text":" ---------------- Summary of input ---------------- \n\n|\u001b[1m Variable \u001b[0m|\u001b[1m Term                \u001b[0m|\u001b[1m Type            \u001b[0m|\u001b[1m Levels \u001b[0m|\n|----------|---------------------|-----------------|--------|\n| 1        | ConstantTerm{Int64} | Vector{Float64} | 1      |\n| lact     | Term                | Matrix{Float64} | 6      |\n| herd     | Term                | Matrix{Float64} | 6      |\n| dim      | Term                | Vector{Float64} | 1      |\n| wilmink  | Term                | Vector{Float64} | 1      |\n| A        | Marker Effect       | Matrix{Float64} | 189    |\n| B        | Marker Effect       | Matrix{Float64} | 3894   |\n\u001b[32mprior var-cov structure for \"e\" is either empty or \"I\" was given. An identity matrix will be used\u001b[39m\n\u001b[32mNo map was provided. Running Bayesian Random Regression (BRR) with all SNP as 1 region\u001b[39m\n\u001b[32mNo map was provided. Running Bayesian Random Regression (BRR) with all SNP as 1 region\u001b[39m\n\n ---------------- Summary of analysis ---------------- \n\n|\u001b[1m Effect \u001b[0m|\u001b[1m Type            \u001b[0m|\u001b[1m Str        \u001b[0m|\u001b[1m df  \u001b[0m|\u001b[1m scale  \u001b[0m|\n|--------|-----------------|------------|-----|--------|\n| A      | Random (Marker) | 1 block(s) | 4.0 | 0.02   |\n| B      | Random (Marker) | 1 block(s) | 4.0 | 0.02   |\n| e      | Random          | I          | 4.0 | 1250.0 |","category":"page"},{"location":"#NextGP.jl:-Modules-and-Functions","page":"Modules","title":"NextGP.jl: Modules and Functions","text":"","category":"section"},{"location":"","page":"Modules","title":"Modules","text":"NextGP.jl relies on several other Julia packages, which could be easily avoided and may be removed in the later releases.\nCurrently one core dependency is the StatsModels.jl package, for model expression, and fixed effect design matrix generation.\nChecking StatsModels.jl's manual for at least formula  and  categorical data could be useful. ","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"","category":"page"},{"location":"#Basic-Model","page":"Modules","title":"Basic Model","text":"","category":"section"},{"location":"","page":"Modules","title":"Modules","text":"NextGP.jl uses the following basic model:","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"$","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"\\mathbf{y}=\\mathbf{X}\\mathbf{b}+\\sum{\\mathbf{Zu}}+\\sum{\\mathbf{M\\beta}}+\\mathbf{e} $","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"b is a vector of fixed effects ","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"u is a vector of polygenic effects in the model with a covariance structure mathbfusim Nleft(0mathbfAsigma_a^2right)","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"A is a relationship matrix from the pedigree","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"Z is a design matrix allocating animals to records","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"M are matrices of genotypes","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"mathbfbeta","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"are vectors  of marker effects","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"","category":"page"},{"location":"#Public-Functions","page":"Modules","title":"Public Functions","text":"","category":"section"},{"location":"","page":"Modules","title":"Modules","text":"Public functions of NextGP are documented here","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"runLMEM\nmakeA\nmakePed\nmakeG\nSNP\nBayesPR\nBayesB\nBayesC\nBayesR\nBayesLV","category":"page"},{"location":"#NextGP.MCMC.runLMEM","page":"Modules","title":"NextGP.MCMC.runLMEM","text":"function runLMEM(formula,userData,nChain,nBurn,nThin;myHints=Dict{Symbol,Any}(),blockThese=[],outFolder=\"outMCMC\",VCV=[],userPedData=[],summaryStat=Dict{Any,Any}())\n\nformula is the model equatio as made available by the StatsModels.jl package\nuserData is a DataFrame including lhs and rhs variables (other than defined by PED and SNP)\nnChain,nBurn and nThin are the chain length, burn-in period, and the thining interval used for the MCMC sampling\nUsers can define coding of their variables (e.g. full dummy coding) by providing myHints. Check StatsModels.jl's manual for categorical data could be useful.  \n\n\n\n\n\n","category":"function"},{"location":"#NextGP.makeA","page":"Modules","title":"NextGP.makeA","text":"makeA(s::Any, d::Any)\n\nMakes pedigree-based relationship matrix. adapted from http://morotalab.org/Mrode2005/relmat/createA.txt\n\n\n\n\n\n","category":"function"},{"location":"#NextGP.makePed","page":"Modules","title":"NextGP.makePed","text":"makePed(inputFile::String,userData)\n\nMakes pedigree using PedigreeBase package\n\n\n\n\n\n","category":"function"},{"location":"#NextGP.makeG","page":"Modules","title":"NextGP.makeG","text":"makeG(inputFile::String;method=1)\n\nMakes genomic relationship matrix based on vanRaden method 1 (defult) or method 2\n\n\n\n\n\n    makeG(inputData::Array{Float64,2};method=1)\n\nMakes genomic relationship matrix based on vanRaden method 1 (defult) or method 2\n\n\n\n\n\n","category":"function"},{"location":"#NextGP.SNP","page":"Modules","title":"NextGP.SNP","text":"    function SNP(name,path;map=\"\")\n\nDefines SNP information for further analysis.\npath is the path for the marker file, or the matrix for the marker genotypes.\nMarker files are currently expected to be ordered as the phenotype data.\nThe method to be applied to the data, GBLUP, BayesB, BayesR etc, is defined in the prior setting.\nMap file is optional. If not provided, a Bayesian Regression model with common variance for all SNPs will be applied. If provided, shoul match the order in the genotype file.\nOne most avoid overlapping marker sets by using different names.\n\n\n\n\n\n","category":"function"},{"location":"#NextGP.BayesPR","page":"Modules","title":"NextGP.BayesPR","text":"    function BayesPR(r,v)\n\nr is the region size. In other words, the number of SNPs that share a common variance.\n1: each SNP has its own (co)variance\n99: SNPs on the same chromosome has the same (co)variance\n9999: All SNPs have the same (co)variance\nOne can define any other region size, for example, 30, 40 or 100\nv is an estimate of the variance for the distribution of SNPs\n\n\n\n\n\n","category":"function"},{"location":"#NextGP.BayesB","page":"Modules","title":"NextGP.BayesB","text":"    function BayesB(pi,v;estimatePi=false)\n\npi is the proportion of SNPs to be included in the model at each McMC cycel. If estimatePi=true, it is only used as a starting value.\nv is the variance for the prior distribution of SNPs.\nestimatePi is trueif pi is estimated. By default it is ´false´\n\n\n\n\n\n","category":"function"},{"location":"#NextGP.BayesC","page":"Modules","title":"NextGP.BayesC","text":"    function BayesC(pi,v;estimatePi=false)\n\npi is the proportion of SNPs to be included in the model at each McMC cycel. If estimatePi=true, it is only used as a starting value.\nv is the variance for the prior distribution of SNPs.\nestimatePi is trueif pi is estimated. By default it is ´false´\n\n\n\n\n\n","category":"function"},{"location":"#NextGP.BayesR","page":"Modules","title":"NextGP.BayesR","text":"    function BayesR(pi,class,v;estimatePi=false)\n\npi is the vector of proportion of SNPs for each variance class. If estimatePi=true, it is only used as a starting value.\nclass is the vector of scales of common SPN variance for each variance class. The scales should be in the increasing order. For example, [0.0,0.0001,0.001,0.01].\nv is the variance for the prior distribution of SNPs.\nestimatePi is trueif pi is estimated. By default it is ´false´\n\n\n\n\n\n","category":"function"},{"location":"#NextGP.BayesLV","page":"Modules","title":"NextGP.BayesLV","text":"    function BayesLV(v,f,covariates,zeta)\n\nv is the variance for the prior distribution of SNPs.\nf is the model formula for the variance\ncovariatesis the DataFrame that includes explanatory varibles for the variance of each SNP.\nzeta is the error variance in the model for the SNP variances.\nIf estimateVarZeta is true, it assumes that the error variance for the model for the SNP variances is 0.01 percent of the variance of the log-variances. If estimateVarZeta is false, it uses zeta as the error variance for the log-linear variances (fixed value). If estimateVarZeta is a Float64, it assumes that the error variance for the model for the SNP variances is estimateVarZeta percent of the variance of the log-variances.\n\n\n\n\n\n","category":"function"},{"location":"#Internals","page":"Modules","title":"Internals","text":"","category":"section"},{"location":"","page":"Modules","title":"Modules","text":"Functions that are used internally are documented here","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"prep","category":"page"},{"location":"#NextGP.prepMatVec.prep","page":"Modules","title":"NextGP.prepMatVec.prep","text":"function prep(f::StatsModels.TermOrTerms, inputData::DataFrame;userHints=Dict{Symbol,Any}(),path2ped=[],priorVCV=[])\n\nNextGP relies on StatsModels.jl package for model expression (f), and fixed effect design matrix generation.\nDetails for the model expression (f), and fixed effects coding specifications (e.g., effect or dummy coding) can be found at StatsModels.jl.\nDesign matrices for random effects are generated either own internal functions or using StatsModels.jls modelcols, depending on how user defined the model term in the model.\nReads in marker data, and mean-centers the columns.\nFinally returns lhs vector and rhs matrices.\nBy default:\nall Int rhs variables are made Categorical,\nall String rhs variables (also those made Categorical) are dummy coded, except those defined by the user in userHints, \nall Float rhs variables are centered.\n\n\n\n\n\n","category":"function"},{"location":"#Convenience-functions","page":"Modules","title":"Convenience functions","text":"","category":"section"},{"location":"#Convergency-statistics-of-parameter-param,-using-MCMCChains.jl","page":"Modules","title":"Convergency statistics of parameter param, using MCMCChains.jl","text":"","category":"section"},{"location":"","page":"Modules","title":"Modules","text":"using MCMCChains,StatsPlots,StatsBase,CSV\n\nfunction convergencyMCMC(param;summary=false,plots=false,outFolder=pwd()*\"/outMCMC\")\n        param = CSV.read(\"$outFolder/$(param)Out\",DataFrame,header=true)\n        namesParam = names(param)\n        param = Matrix(param)\n                if summary==true\n                        chn = Chains(param,namesParam)\n                        display(chn)\n                        if plots==true\n                                display(plot(chn))\n                        end\n                        param = mean(Matrix(param),dims=1)\n                else\n                        param = mean(Matrix(param),dims=1)\n                end\n        return param\nend\n","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"If summary=true, will print convergency statistics for McMC\nIf plots=true, will print trace plot(s) of McMC\noutFolder is the folder for the McMC output. By default it searches for the folder \"outMCMC\" in the current directory.","category":"page"},{"location":"","page":"Modules","title":"Modules","text":"","category":"page"},{"location":"PBLUP/PBLUP/#PBLUP","page":"PBLUP","title":"PBLUP","text":"","category":"section"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"using CSV, StatsModels, DataFrames, NextGP","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"data = CSV.read(\"YOURPATH/phenotypes.csv\",DataFrame)","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"ID     Sire  Dam   Herds Pen BW\nQGG5   QGG1  QGG2  1     1   35.0\nQGG6   QGG3  QGG2  1     2   20.0\nQGG7   QGG4  QGG6  1     2   25.0\nQGG8   QGG3  QGG5  1     1   40.0\nQGG9   QGG1  QGG6  2     1   42.0\nQGG10  QGG3  QGG2  2     2   22.0\nQGG11  QGG3  QGG7  2     2   35.0\nQGG12  QGG8  QGG7  3     2   34.0\nQGG13  QGG9  QGG2  3     1   20.0\nQGG14  QGG3  QGG6  3     2   40.0","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"pedigree = \"YOURPATH/pedigreeBase.txt\"","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"\"YOURPATH/pedigreeBase.txt\"","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"#Pedigree for the above example\nQGG1 0 0\nQGG2 0 0\nQGG3 0 0\nQGG4 0 0\nQGG5 QGG1 QGG2\nQGG6 QGG3 QGG2\nQGG7 QGG4 QGG6\nQGG8 QGG3 QGG5\nQGG9 QGG1 QGG6\nQGG10 QGG3 QGG2\nQGG11 QGG3 QGG7\nQGG12 QGG8 QGG7\nQGG13 QGG9 QGG2\nQGG14 QGG3 QGG6","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"f = @formula(BW ~ Herds + Pen + PED(ID) + PED(Dam) + (1|Dam))","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"FormulaTerm\nResponse:\n  BW(unknown)\nPredictors:\n  Herds(unknown)\n  Pen(unknown)\n  (ID)->PED(ID)\n  (Dam)->PED(Dam)\n  (Dam)->1 | Dam","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"myHints = Dict(:Dam => StatsModels.FullDummyCoding(),\n            :ID => StatsModels.FullDummyCoding(),\n            :Herds => StatsModels.DummyCoding(),\n            :Pen => StatsModels.FullDummyCoding())","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"blk = [(:Herds,:Pen)]","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"priorVar = Dict(:ID      => Random(\"A\",150.0),\n                :Dam     => Random(\"A\",90.0),\n                :(1|Dam) => Random(\"I\",40.0),\n                :e       => Random(\"I\",350.0));","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"@time runLMEM(f,data,100000,10000,10;myHints=myHints,blockThese=blk,VCV=priorVar,userPedData=pedigree)","category":"page"},{"location":"PBLUP/PBLUP/","page":"PBLUP","title":"PBLUP","text":"Output folder outMCMC exists. Removing its content\n\n ---------------- Summary of input ---------------- \n\n|Variable   Term   Type              Levels\n|----------|------|-----------------|--------|\n| Herds    | Term | Matrix{Float64} | 2      |\n| Pen      | Term | Matrix{Float64} | 2      |\n| ID       | PED  | Matrix{Bool}    | 14     |\n| Dam      | PED  | Matrix{Bool}    | 14     |\n| 1 | Dam  | |    | Matrix{Float64} | 4      |\n\nprior var-cov structure for \"e\" is either empty or \"I\" was given. An identity matrix will be used\nprior var-cov structure for ID is A. Computed A matrix (from pedigree file) will be used\nprior var-cov structure for Dam is A. Computed A matrix (from pedigree file) will be used\nprior var-cov structure for 1 | Dam is either empty or \"I\" was given. An identity matrix will be used\n\n ---------------- Summary of analysis ---------------- \n\n|Effect    Type     Str   df    scale\n|---------|--------|-----|-----|-------|\n| ID      | Random | A   | 4.0 | 75.0  |\n| Dam     | Random | A   | 4.0 | 45.0  |\n| 1 | Dam | Random | I   | 4.0 | 20.0  |\n| e       | Random | I   | 4.0 | 175.0 |\n\n\nMCMC progress... 100%|███████████████████████████████████| Time: 0:00:10","category":"page"}]
}
