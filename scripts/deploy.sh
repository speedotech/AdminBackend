source .env.production

npm run build

scp -r dist/* $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH

ssh $DEPLOY_USER@$DEPLOY_HOST << EOF
  cd $DEPLOY_PATH
  npm install --production
  pm2 restart $APP_NAME
EOF 