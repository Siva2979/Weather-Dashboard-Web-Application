# Weather App - Modern Forecast Application

A beautiful, modern weather application with advanced UI features, built with React, Node.js, and deployed on AWS using Terraform and Ansible.

## Features

- 🌤️ Real-time weather data from OpenWeatherMap API
- 📱 Responsive, modern UI with smooth animations
- 🎨 Dynamic background gradients based on temperature
- 📊 5-day weather forecast
- 🔍 City search functionality
- 📍 Automatic location detection
- ☀️ Detailed weather information (sunrise, sunset, humidity, wind, etc.)

## Project Structure

```
kalyan-weather/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express API server
├── terraform/         # AWS infrastructure as code
├── ansible/           # Configuration management
└── README.md
```

## Prerequisites

### Windows (Terraform & AWS CLI)
- Terraform installed and configured
- AWS CLI configured with credentials
- SSH key pair (`~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub`)

### WSL (Ansible)
- Ansible installed in WSL
- Python 3 installed

### General
- Node.js 18+ and npm
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Save it for later use

### 2. Local Development

#### Install Dependencies

```bash
# Install all dependencies
npm run install-all
```

#### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env and add your OPENWEATHER_API_KEY
```

#### Run Development Servers

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

The app will be available at `http://localhost:3000`

### 3. Build for Production

```bash
# Build frontend
npm run build:frontend
```

### 4. Deploy to AWS

#### Step 1: Terraform (Windows)

```bash
cd terraform

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply infrastructure
terraform apply

# Note the output IP address
terraform output instance_public_ip
```

#### Step 2: Update Ansible Inventory (WSL)

```bash
cd ansible

# Edit inventory.ini and replace YOUR_EC2_IP with the IP from Terraform output
nano inventory.ini
```

#### Step 3: Deploy with Ansible (WSL)

```bash
# Run the playbook (replace YOUR_API_KEY with your OpenWeatherMap API key)
ansible-playbook playbook.yml -e "openweather_api_key=YOUR_API_KEY"
```

## Access the Application

After deployment, access the application at:
```
http://YOUR_EC2_IP
```

## Terraform Files

- `main.tf` - Main infrastructure configuration (VPC, EC2, Security Groups)
- `variables.tf` - Variable definitions
- `outputs.tf` - Output values (IP addresses, etc.)

## Ansible Files

- `playbook.yml` - Main deployment playbook
- `inventory.ini` - Server inventory
- `ansible.cfg` - Ansible configuration

## Environment Variables

### Backend (.env)
```
OPENWEATHER_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=production
```

### Frontend
Set `REACT_APP_API_URL` if backend is on different domain (defaults to `http://localhost:5000`)

## Cleanup

To destroy AWS resources:

```bash
cd terraform
terraform destroy
```

## Technologies Used

- **Frontend**: React, Framer Motion, Lucide React
- **Backend**: Node.js, Express, Axios
- **Infrastructure**: Terraform, AWS (EC2, VPC, Security Groups)
- **Deployment**: Ansible, PM2, Nginx

## License

MIT

