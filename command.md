<!-- deployment command -->
# deployment create/apply
kubectl apply -f deployment.yml

# deployments dekhne ke liye
kubectl get deployments

# pods dekhne ke liye
kubectl get pods

# detailed info
kubectl describe deployment express-deployment

# logs dekhne ke liye
kubectl logs <pod-name>

# live changes watch
kubectl get pods -w

# deployment update/restart
kubectl rollout restart deployment express-deployment

# deployment scale
kubectl scale deployment express-deployment --replicas=3

# deployment delete
kubectl delete deployment express-deployment

<!-- service command -->
# service create/apply
kubectl apply -f service.yml

# services dekhne ke liye
kubectl get services

# service detail
kubectl describe service express-service

# service delete
kubectl delete service express-service

<!-- ingress command -->
# ingress controller download
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml

# ingress create/apply
kubectl apply -f ingress.yml

# ingress dekhne ke liye
kubectl get ingress

# ingress detail
kubectl describe ingress express-ingress

# ingress delete
kubectl delete ingress express-ingress

<!-- general usefull command -->
# saare resources
kubectl get all

# namespace ke sath
kubectl get all -n default

# yaml output
kubectl get deployment express-deployment -o yaml

# pod ke andar jana
kubectl exec -it <pod-name> -- sh

# pod delete
kubectl delete pod <pod-name>

# file validate
kubectl apply -f deployment.yaml --dry-run=client

# current context
kubectl config current-context

<!-- miniflow -->
kubectl apply -f deployment.yaml

kubectl apply -f service.yaml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml

kubectl apply -f ingress.yaml

kubectl get all
kubectl get ingress