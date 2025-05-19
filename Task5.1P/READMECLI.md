**Prerequisites**

- Google Cloud account
- Google Cloud CLI installed ([Install Guide](https://cloud.google.com/sdk/docs/install))
- Docker installed
- Node.js installed

### 1. **Google Cloud Setup**

#### a. Enable Artifact Registry API:
- Go to: [APIs & Services > Library](https://console.cloud.google.com/apis/library)
- Search for `Artifact Registry API` and click **Enable**

#### b. Authenticate Google Cloud CLI:
gcloud auth login
gcloud config set project PROJECT_ID

**Authenticate Docker with Artifact Registry:**
gcloud auth configure-docker australia-southeast1-docker.pkg.dev

**Create Artifact Registry Repository**
Go to Artifact Registry > Repositories

Click Create Repository

Name: shiftsync

Format: Docker

Location: australia-southeast1 (Sydney)

Click Create

**Build and Tag Docker Image**
I used the same image I built for Task5.1P

**Tag image for Artifact Registry**
docker tag shiftsync-app australia-southeast1-docker.pkg.dev/YOUR_PROJECT_ID/shiftsync/shiftsync-app

**Push Image to Artifact Registry**
docker push australia-southeast1-docker.pkg.dev/YOUR_PROJECT_ID/shiftsync/shiftsync-app

**Verify the Image**
Go to Artifact Registry Console

Open your shiftsync repository

You should see shiftsync-app:latest listed under Images

**Run the Image from GCR**
docker run -p 3000:3000 australia-southeast1-docker.pkg.dev/YOUR_PROJECT_ID/shiftsync/shiftsync-app

**API Endpoints**
Method	Endpoint	   Description
GET	    /shifts	       List all shifts
POST	/shifts	       Add a new shift
POST	/clockin	   Clock-in to a shift

