# Load the IBM HR Analytics dataset
data <- read.csv("ibm-hr-analytics-attrition-dataset.csv")

# Remove missing values
data <- data[complete.cases(data), ]

# Summary statistics for job satisfaction
mean(data$JobSatisfaction)
median(data$JobSatisfaction)
sd(data$JobSatisfaction)

# Histogram of job satisfaction
hist(data$JobSatisfaction)

# Bar plot of job satisfaction and attrition
barplot(table(data$Attrition, data$JobSatisfaction))

# Bootstrap distribution of the sample mean
bootstrap_mean <- function(data, index) {
  return(mean(data[index]))
}

bootstrap_distribution <- replicate(1000, bootstrap_mean(data$JobSatisfaction, sample(1:nrow(data), replace = TRUE)))

# Confidence interval
quantile(bootstrap_distribution, c(0.025, 0.975))

# Hypothesis test
observed_mean <- mean(data$JobSatisfaction)

randomization_difference <- function(data, mean) {
  return(mean(data) - mean)
}

randomization_distribution <- replicate(1000, randomization_difference(sample(data$JobSatisfaction, replace = TRUE), 3))

p_value <- mean(abs(randomization_distribution) >= abs(observed_mean - 3))
