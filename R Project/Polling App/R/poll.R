poll_ui <- function(id) {
  ns <- NS(id)
  
  tagList(
    fluidRow(
      column(
        width = 6,
        textInput(ns("name"), "Full name:"),
        numericInput(ns("age"), "Age:", value = 0),
        numericInput(ns("height"), "Height:", value = 0)
      ),
      column(
        width = 6,
        selectizeInput(
          ns("color"),
          "Favorite color:",
          choices = c("Red", "Green", "Blue")),
        textAreaInput(
          ns("comments"),
          width = "100%",
          label = "Comments"
        ),
        actionButton(ns("submit"), "Submit")
      )
    )
  )
  
}

poll_server <- function(id) {
  moduleServer(
    id = id,
    module = function(input, output, session) {
      
      observeEvent(input$submit, {
        
        name <- input$name
        age <- input$age
        height <- input$height
        color <- input$color
        comments <- input$comments
        time <- Sys.time()
        url <- Sys.getenv("db_url")
        
        future({
          upload_row(
            x = list(
              "name" = name,
              "age" = age,
              "height" = height,
              "color" = color,
              "comments" = comments,
              "time" = time
            ),
            projectURL = url,
            fileName = "polls"
          )
        })
        
      })
      
    }
  )
}