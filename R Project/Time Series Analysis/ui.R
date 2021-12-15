library(shiny)

fluidPage(
    tags$h2("Visualizing Streaming Data with Shiny",
            style="color:blue;text-align:center"),

    plotOutput("plot1",height = "600px")
)
