read_results_ui <- function(id) {
  ns <- NS(id)
  
  tagList(
    dataTableOutput(ns("results"))
  )
}

read_results_server <- function(id) {
  moduleServer(
    id = id,
    module = function(input, output, session) {
      
      timer <- reactiveTimer(15000)
      
      data <- reactiveValues()
      
      observe({
        url <- Sys.getenv("db_url")
        data$results <- future({
          download_df(
            projectURL = url,
            fileName = "polls")
        })
        timer()
      
      })
      
      output$results <- renderDataTable({
        data$results
      })
      
    }
  )
}