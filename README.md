# 3-Tier Secure Application Deployment on AWS EKS

This repository contains the configuration files and manifests to deploy a secure 3-tier web application (Nginx Frontend, Node.js Backend, and PostgreSQL Database) to Amazon EKS using Terraform and GitHub Actions.

---

## 🛠️ Prerequisites

Ensure you have the following tools installed and configured on your local machine:
1. **AWS CLI** (configured with access keys in `us-east-1`)
2. **Terraform CLI** (v1.5.0 or higher)
3. **kubectl** (Kubernetes command-line tool)
4. **Git**

---

## 🚀 How to ACTIVATE the Infrastructure & Pipeline

Follow these steps to spin up the network, EKS cluster, and deploy the application.

### Step 1: Provision the Infrastructure
Navigate to the `terraform` directory and run Terraform to build the VPC, KMS Keys, and EKS Cluster with `t3.micro` nodes:
```bash
cd terraform
terraform init
terraform apply -auto-approve
```
*Note: This process takes approximately 10-15 minutes to complete on AWS.*

### Step 2: Configure Local Kubernetes Access
Once Terraform completes, update your local `kubeconfig` to connect `kubectl` to the new cluster:
```bash
aws eks update-kubeconfig --region us-east-1 --name three-tier-eks-cluster
```

### Step 3: Configure GitHub Secrets (First Time Only)
Ensure your GitHub repository has the following secrets configured under **Settings > Secrets and variables > Actions**:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (`us-east-1`)
- `AWS_ACCOUNT_ID` (12-digit account number)
- `ECR_FRONTEND_REPO`
- `ECR_BACKEND_REPO`

### Step 4: Deploy the Code (Trigger the Pipeline)
Push the code changes to the `main` branch to trigger the GitHub Actions workflow, which builds the Docker images, pushes them to ECR, and deploys them to the EKS cluster:
```bash
git add .
git commit -m "Activate pipeline deployment"
git push origin main
```

### Step 5: Access the Application
Once the pipeline finishes successfully, fetch the public LoadBalancer URL:
```bash
kubectl get service frontend-service
```
Copy the URL under the `EXTERNAL-IP` column and open it in your browser.

---

## 🛑 How to DEACTIVATE & Clean Up (Avoid Charges)

To ensure you are not billed for idle resources on AWS, you must tear down the stack. **You must delete the Kubernetes services first to prevent orphaned AWS Load Balancers.**

### Step 1: Delete Kubernetes Resources
Run this command from the root directory to clean up all deployments, services, and pods. This will automatically delete the AWS Classic Load Balancer:
```bash
kubectl delete -f k8s/
```
*(Wait 1-2 minutes for the Load Balancer to disappear in your AWS Console).*

### Step 2: Destroy AWS Infrastructure
Navigate to the `terraform` directory and run the destroy command to remove EKS, VPC, Subnets, and IAM roles:
```bash
cd terraform
terraform destroy -auto-approve
```
*Note: This process takes approximately 5-10 minutes.*

