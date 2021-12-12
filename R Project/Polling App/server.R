shinyServer(function(input, output, session) {

  poll_server("main")
  read_results_server("results")
  
})
