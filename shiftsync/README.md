# ShiftSync – Cloud-Native Web Application

github repo URL : https://github.com/KeerthanaVijekumar/SIT737_s224719679

# Technologies Used

- **Node.js + Express.js** – backend services
- **Docker** – containerization
- **Docker Hub** – image repository
- **Kubernetes (GKE)** – container orchestration
- **MongoDB** – NoSQL backend
- **Google Cloud Monitoring & Logging** – observability
- **kubectl CLI** – cluster management

# Create GKE Cluster in GCP
can use command
gcloud container clusters create shiftsync-cluster ^
  --region australia-southeast1 ^
  --num-nodes 3 ^
  --enable-stackdriver-kubernetes


## Containerize Each Service
Each microservice has its own Dockerfile. Example for auth-service:

cd auth-service
docker build --no-cache -t s224719679/auth-service:v1 .
docker push s224719679/auth-service:v1

Repeat for:

admin-service

frontend-service

## Image Hosting – Docker Hub
Note: Although Google Container Registry (GCR) was initially considered, regional restrictions caused issues with pushing images. As a result, all images were successfully pushed to Docker Hub under the username s224719679.

# Deploy to Kubernetes

# Auth service

kubectl apply -f kube/auth-deployment.yaml
kubectl apply -f kube/auth-service.yaml

# Admin

kubectl apply -f kube/admin-deployment.yaml
kubectl apply -f kube/admin-service.yaml

# Frontend

kubectl apply -f kube/frontend-deployment.yaml
kubectl apply -f kube/frontend-service.yaml

verify with
kubectl get pods
kubectl get svc

Access the app 
Frontend is accessible via the LoadBalancer IP

http://<frontend-external-ip>/login/login.html