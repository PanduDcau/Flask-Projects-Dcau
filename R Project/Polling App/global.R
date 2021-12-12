library(shiny)
if (!require("devtools")) install.packages("devtools")
devtools::install_github("Kohze/fireData")

library(fireData)
library(promises)
library(future)
library(data.table)

plan(multisession)

lapply(list.files("R"), FUN = function(x) source(paste0("R/", x)))