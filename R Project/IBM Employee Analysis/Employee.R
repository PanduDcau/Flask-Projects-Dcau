library(tidyverse)
library(dplyr)
library(boot)

attrition <- read_csv("Project1/WA_Fn-UseC_-HR-Employee-Attrition.csv")
head (Attrition)

# Calculate summary statistics
summary (Attrition [c("Age", "DailyRate", "DistanceFromHome", "Education",
                      "EnvironmentSatisfaction", "HourlyRate", "JobInvolvement",
                      "JobLevel", "JobSatisfaction", "MonthlyIncome",
                      "MonthlyRate", "NumCompaniesWorked", "PercentSalaryHike",
                      "PerformanceRating", "RelationshipSatisfaction",
                      "StockOptionLevel", "TotalWorkingYears",
                      "TrainingTimesLastYear", "WorkLifeBalance", "YearsAtCompany",
                      "YearsInCurrentRole", "YearsSinceLastPromotion",
                      "YearsWithCurrManager")])

glimpse(attrition)

ggplot(attrition, aes(x = Gender, fill = Attrition)) +
  geom_bar(position = "dodge") +
  labs(title = "Attrition by Gender", x = "Gender", y = "Count")

ggplot(attrition, aes(x = BusinessTravel, fill = Attrition)) +
  geom_bar() +
  labs(title = "Attrition by Business Travel", x = "Business Travel", y = "Count") +
  scale_fill_manual(values = c("#F8766D", "#00BA38"), name = "Attrition", labels = c("Yes", "No"))

ggplot(attrition, aes(x = Age, fill = Attrition)) +
  geom_histogram(binwidth = 2, position = "dodge", alpha = 0.7) +
  labs(title = "Attrition by Age", x = "Age", y = "Count") +
  scale_fill_manual(values = c("#F8766D", "#00BA38"), name = "Attrition", labels = c("Yes", "No"))

ggplot(attrition, aes(x = Attrition, y = MonthlyIncome, fill = Attrition)) +
  geom_boxplot(alpha = 0.7) +
  labs(title = "Monthly Income by Attrition", x = "Attrition", y = "Monthly Income") +
  scale_fill_manual(values = c("#F8766D", "#00BA38"), name = "Attrition", labels = c("Yes", "No"))

# Plot distribution of ages
ggplot(attrition, aes(x = Age)) +
  geom_histogram(fill = "blue", alpha = 0.5) +
  ggtitle("Distribution of Employee Ages")

# Plot distribution of monthly income
ggplot(attrition, aes(x = MonthlyIncome)) +
  geom_histogram(fill = "green", alpha = 0.5) +
  ggtitle("Distribution of Employee Monthly Income")

# Plot relationship between age and job satisfaction
ggplot(attrition, aes(x = Age, y = JobSatisfaction)) +
  geom_point(alpha = 0.5) +
  geom_smooth(method = "lm", se = FALSE) +
  ggtitle("Relationship between Age and Job Satisfaction")

ggplot(attrition, aes(x=JobSatisfaction, fill=Attrition)) +
  geom_density(alpha=0.5) +
  ggtitle("Job Satisfaction Distribution by Attrition Status") +
  labs(x="Job Satisfaction") +
  theme_minimal()


# Subset the data to include only the relevant variables
data <- attrition %>%
  select(Attrition, JobSatisfaction)

# Define the function to calculate the mean difference in job satisfaction
mean_diff <- function(data, index) {
  d <- data[index,]
  mean(d$JobSatisfaction[d$Attrition == "Yes"]) -
    mean(d$JobSatisfaction[d$Attrition == "No"])
}

# Generate the bootstrap distribution
set.seed(123)
bootstrap <- boot(data, mean_diff, R = 1000)

# Calculate the confidence interval
conf_int <- boot.ci(bootstrap, type = "basic")$basic
lower_bound <- conf_int[1]
upper_bound <- conf_int[2]

# Visualise the bootstrap distribution and confidence interval
ggplot(data.frame(bootstrap$t), aes(x = bootstrap$t)) +
  geom_density(fill = "grey", alpha = 0.5) +
  geom_vline(xintercept = lower_bound, linetype = "dashed", color = "red") +
  geom_vline(xintercept = upper_bound, linetype = "dashed", color = "red") +
  labs(title = "Bootstrap Distribution of Mean Difference in Job Satisfaction",
       x = "Mean Difference in Job Satisfaction", y = "Density")


#test
data <- attrition %>%
  select(Attrition, JobSatisfaction)

test_stat <- function(data, ind) {
  mean(data$JobSatisfaction[ind[data$Attrition == "Yes"]]) -
    mean(data$JobSatisfaction[ind[data$Attrition == "No"]])
}
obs_stat <- test_stat(data, 1:nrow(data))
n_perm <- 1000
null_dist <- replicate(n_perm, {
  perm_data <- data %>%
    mutate(Attrition = sample(Attrition))
  test_stat(perm_data, 1:nrow(perm_data))
})

p_value <- mean(abs(null_dist) >= abs(obs_stat))
ggplot() +
  geom_density(aes(null_dist), fill = "grey", alpha = 0.5) +
  geom_vline(xintercept = obs_stat, color = "red") +
  labs(title = "Permutation Test of Job Satisfaction and Attrition",
       x = "Difference in Job Satisfaction", y = "Density")

