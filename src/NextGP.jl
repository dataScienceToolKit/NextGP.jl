module NextGP

#exporting run-time equivalent of functions
export ran
export runGibbs

using DataFrames
using CategoricalArrays
using StatsModels
using MixedModels

include("MME.jl")
include("runTime.jl")
include("MCMC.jl")

end
