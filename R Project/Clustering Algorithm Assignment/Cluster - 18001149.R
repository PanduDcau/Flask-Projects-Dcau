library(factoextra)
library(cluster)

#Creating the matrix for the 11 Objects
mat1.data <- c(2,9,2,5,8,4,5,8,7,5,6,4,1,2,4,9,7,3,2,4,8,5)

rnames <- c("1","2","3","4","5","6","7","8","9","10","11")
cnames <- c("x","y")
cluster_matrix <- matrix(mat1.data,nrow=11,byrow=TRUE,dimnames=list(rnames,cnames))
cluster_matrix

#compute distance matrix
e <- dist(cluster_matrix, method = "euclidean")
d <- dist(cluster_matrix, method = "manhattan")
d  #Euclidean Distance Matrix
e  #Manhattan Distance Matrix


#define linkage methods
m <- c( "average", "single", "complete", "ward")
names(m) <- c( "average", "single", "complete", "ward")

#function to compute agglomerative coefficient
ac <- function(x) {
  agnes(cluster_matrix, method = x)$ac
}

#calculate agglomerative coefficient for each clustering linkage method
sapply(m, ac)


#perform hierarchical clustering using Single Linkage
#clust <- agnes(cluster_matrix, method = "ward")
#1) Single Linkage
clust <- agnes(cluster_matrix, method = "single")

#produce dendrogram
pltree(clust, cex = 0.6, hang = -1, main = "Single Linkage Dendrogram")

#calculate gap statistic for each number of clusters (up to 10 clusters)
gap_stat <- clusGap(cluster_matrix, FUN = hcut, nstart = 25, K.max = 10, B = 50)

#produce plot of clusters vs. gap statistic
fviz_gap_stat(gap_stat)


#perform hierarchical clustering using complete Linkage
#2) Complete Linkage
clust2 <- agnes(cluster_matrix, method = "complete")

#produce dendrogram
pltree(clust2, cex = 0.6, hang = -1, main = "Complete Linkage Dendrogram")

#calculate gap statistic for each number of clusters (up to 10 clusters)
gap_stat <- clusGap(cluster_matrix, FUN = hcut, nstart = 25, K.max = 10, B = 50)

#produce plot of clusters vs. gap statistic
fviz_gap_stat(gap_stat)



#perform hierarchical clustering using Average Linkage
#3) Average Linkage
clust3 <- agnes(cluster_matrix, method = "average")

#produce dendrogram
pltree(clust3, cex = 0.6, hang = -1, main = "Average Linkage Dendrogram")

#calculate gap statistic for each number of clusters (up to 10 clusters)
gap_stat <- clusGap(cluster_matrix, FUN = hcut, nstart = 25, K.max = 10, B = 50)

#produce plot of clusters vs. gap statistic
fviz_gap_stat(gap_stat)




#perform hierarchical clustering using Ward's method
final_clust <- hclust(d, method = "ward.D2" )
final_clust

#cut the dendrogram into 4 clusters
groups <- cutree(final_clust, k=4)

#find number of observations in each cluster
table(groups)

#append cluster labels to original data
final_data <- cbind(cluster_matrix, cluster = groups)

#display first six rows of final data
final_data

