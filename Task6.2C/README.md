# Task 6.2C - Local Kubernetes Deployment with Port Forwarding and code update

This README documents the process of deploying the **ShiftSync** application to a **local Kubernetes cluster** using **Docker Desktop + Kubernetes**.

## Objective
Built a new Docker image locally after applying a code change (added /version route) to demonstrate an updated deployment for Task 6.2C Part II and used port forwarding to access the application via a browser.

# Prerequisites
- Docker Desktop with Kubernetes enabled
- New docker image built with code change
- Kubernetes CLI (`kubectl`)
- Docker CLI

This creates a new version of the application image after applying the code update.
# Build the new image 
```
docker build -t shiftsync-app:task6-2c-v2 .
```

### Step 2: Tag the image 
```
docker tag shiftsync-app:task6-2c-v2 shiftsync-app:task6-2c-updated
```
In my deployment.yaml file;
**Note**: `imagePullPolicy: Never` is mandatory because I'm using a **locally tagged image**, not pulling from remote.

## Deployment Steps

### Apply the deployment and service
```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```
## Browser Access
Port-forwarding is used for browser-based access.
```
kubectl port-forward service/shiftsync-service 3000:80
```

### Check deployment status
```
kubectl get all
```

## Then open your browser to:
```
http://localhost:3000
```
## To verify code update:
```
http://localhost:3000/version
```
