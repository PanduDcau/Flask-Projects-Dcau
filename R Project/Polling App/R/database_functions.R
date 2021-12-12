library(fireData)
## Install data.table package
#install.packages("data.table")

## Load data.table package
library(data.table)

#upload(x = mtcars, projectURL = Sys.getenv("db_url") , directory = "main/testing")

#download(Sys.getenv("db_url"), fileName = "main/testing")
#rbindlist(download(Sys.getenv("db_url"), fileName = "main/testing"))

upload_row <- function(x, projectURL , fileName)
{
  upload(x = x, projectURL = projectURL, directory = paste0("main/",fileName))
  
}

download_df <- function(projectURL, fileName) {
  rbindlist(
    download(projectURL = projectURL, fileName = paste0("main/",fileName))
  )
}

