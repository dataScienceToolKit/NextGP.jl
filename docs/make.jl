using Documenter
using NextGP
using NextGP.equations

push!(LOAD_PATH,"../src/")
makedocs(
         modules  = [NextGP,NextGP.equations],
         doctest  = true,
         clean    = true,
         sitename = "NextGP.jl",
         authors  = "Emre Karaman",
         pages = [
            "Home" => "index.md",
		"Examples" => ["Example1" => "example1/example1.md",
			       "Example2" => "example2/example2.md",
			],
         ],
)
# Documenter can also automatically deploy documentation to gh-pages.
# See "Hosting Documentation" and deploydocs() in the Documenter manual
# for more information..
deploydocs(
    repo = "github.com/datasciencetoolkit/NextGP.jl",
)
