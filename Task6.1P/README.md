# Task 6.1P - Local Kubernetes Deployment

This README documents the process of deploying the **ShiftSync** application to a **local Kubernetes cluster** using **Docker Desktop + Kubernetes**, as part of SIT737 Task 6.1P.

Objective
Deploy the existing Docker image of the `ShiftSync` application to a local Kubernetes cluster without using NodePort or external exposure.

# Prerequisites
- Docker Desktop with Kubernetes enabled
- Docker image from previous task (Task 5.2D)
- Kubernetes CLI (`kubectl`)
- Docker CLI

# Image Preparation

I used the same image pushed in Task 5.2D:

```
australia-southeast1-docker.pkg.dev/sit737-25t1-vijekumar-a4c8928/shiftsync/shiftsync-app:latest
```

### Step 1: Pull the image from Artifact Registry
```
docker pull australia-southeast1-docker.pkg.dev/sit737-25t1-vijekumar-a4c8928/shiftsync/shiftsync-app:latest
```

### Step 2: Tag the image for local Kubernetes usage
```
docker tag australia-southeast1-docker.pkg.dev/sit737-25t1-vijekumar-a4c8928/shiftsync/shiftsync-app:latest shiftsync-app:latest
```
In my deployment.yaml file;
**Note**: `imagePullPolicy: Never` is mandatory because I'm using a **locally tagged image**, not pulling from remote.

## Deployment Steps

### Step 1: Apply the deployment and service
```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### Step 2: Check deployment status
```
kubectl get all
```

# Limitations
- Since I used **ClusterIP** and **did not expose**, the app is not accessible via browser.
- This setup is meant for validating Kubernetes deployment only.
- In Task 6.2C, I will use kubectl port-forward to demonstrate accessibility of the application via a web browser.
