# UniEvent Deployment Guide (AWS EC2 + Nginx)

This guide deploys the React app from this repo to an Ubuntu EC2 instance using Nginx.

## 1) SSH into EC2

```bash
ssh -i /path/to/your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

## 2) Install required packages

```bash
sudo apt update
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 3) Clone repository

```bash
cd ~
git clone https://github.com/MianArqam/unievents.git
cd unievents
```

## 4) Configure environment (build-time)

Create `.env` in repo root:

```bash
cat > .env << 'EOF'
REACT_APP_TICKETMASTER_KEY=YOUR_TICKETMASTER_CONSUMER_KEY
EOF
```

## 5) Install dependencies and build

```bash
npm ci
npm run build -- --outDir build
```

## 6) Deploy static build to web root

```bash
sudo mkdir -p /var/www/unievent
sudo rm -rf /var/www/unievent/build
sudo cp -r build /var/www/unievent/build
```

## 7) Install Nginx site config

Use the included `nginx.conf` from repo:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/unievent
sudo ln -sf /etc/nginx/sites-available/unievent /etc/nginx/sites-enabled/unievent
sudo rm -f /etc/nginx/sites-enabled/default
```

## 8) Test and restart Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 9) Open firewall/security group

In AWS EC2 Security Group, allow inbound:
- TCP 80 (HTTP)
- TCP 443 (HTTPS, if you later add SSL)

If UFW is enabled on Ubuntu:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 10) Verify deployment

```bash
curl -I http://YOUR_EC2_PUBLIC_IP
```

You should receive `HTTP/1.1 200 OK`.

---

## Optional: HTTPS with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Update deployment after new commits

```bash
cd ~/unievents
git pull origin main
npm ci
npm run build -- --outDir build
sudo rm -rf /var/www/unievent/build
sudo cp -r build /var/www/unievent/build
sudo systemctl restart nginx
```
