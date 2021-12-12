shinyUI(fluidPage(
  fluidRow(
      column(width = 6,
             poll_ui("main")
             ),
      column(width = 6,
             read_results_ui("results")
             )
  )
))
