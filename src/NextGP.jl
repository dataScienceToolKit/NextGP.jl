module NextGP

#exporting ranTime equivalent of functions
export RUNTIME.ran
export runGibbs

using DataFrames
using CategoricalArrays
using StatsModels
using MixedModels

include("MME.jl")
#include("addTerms.jl")
include("runTime.jl")

runGibbs = function(formula, userHints, userData)
	return MME.mme(formula, userHints, userData)
end

end
