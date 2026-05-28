# Kubernetes Auto Scaling (HPA) — Beginner Friendly Notes

# 1. Docker vs Kubernetes

## Docker kya karta h?
Docker sirf container run karta h.

Example:
```bash
docker run nginx
```

Isse ek container start ho jayega.

But:
- Docker automatic scaling nahi karta
- Load balance nahi karta
- Auto recovery limited hoti h

---

## Kubernetes kya karta h?
Kubernetes containers ko manage karta h.

Ye:
- Pods create karta h
- Auto scaling karta h
- Load balancing karta h
- Failed pods dubara create karta h

---

# 2. Pod kya hota h?

Pod Kubernetes ka smallest unit hota h.

Container Kubernetes ke andar Pod ke form me run hota h.

Example:
```text
Pod
 └── Container
```

Agar deployment me 3 replicas diye:
```yaml
replicas: 3
```

To:
- 3 pods create honge
- Har pod me app ka container chalega

Check:
```bash
kubectl get pods
```

---

# 3. Deployment kya hota h?

Deployment pods ko manage karta h.

Example:
```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: express-deployment

spec:
  replicas: 3

  selector:
    matchLabels:
      app: express

  template:
    metadata:
      labels:
        app: express

    spec:
      containers:
        - name: express-container
          image: express-server:latest
```

Apply:
```bash
kubectl apply -f deployment.yaml
```

---

# 4. Service kya hota h?

Service pods ko expose karta h.

Ye traffic ko multiple pods me distribute karta h.

Example:
```text
User Request
      ↓
Service
 ↓    ↓    ↓
Pod1 Pod2 Pod3
```

---

# 5. Auto Scaling kya hota h?

Auto scaling ka matlab:

Load badhe to:
```text
3 Pods → 5 Pods
```

Load kam ho:
```text
5 Pods → 3 Pods
```

Ye automatically hota h.

---

# 6. HPA kya hota h?

HPA = Horizontal Pod Autoscaler

Ye pods ko automatically increase/decrease karta h.

Example:
```text
CPU usage high
      ↓
HPA detect karta h
      ↓
New pods create hote h
```

---

# 7. Metrics Server kya hota h?

Metrics Server Kubernetes ka monitoring component h.

Ye:
- CPU usage collect karta h
- Memory usage collect karta h

Example:
```text
Pod-1 → 20% CPU
Pod-2 → 80% CPU
Pod-3 → 75% CPU
```

Ye data Metrics Server collect karta h.

Fir HPA use karta h.

---

# 8. Metrics Server install

Command:
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```


# 8.1 Metrics Server patch (run in cmd)
kubectl patch deployment metrics-server -n kube-system --type=json -p="[{\"op\":\"add\",\"path\":\"/spec/template/spec/containers/0/args/-\",\"value\":\"--kubelet-insecure-tls\"},{\"op\":\"add\",\"path\":\"/spec/template/spec/containers/0/args/-\",\"value\":\"--kubelet-preferred-address-types=InternalIP\"}]"

kubectl rollout restart deployment metrics-server -n kube-system


Check:
```bash
kubectl get pods -n kube-system
```

Agar metrics-server Running h:
```text
metrics-server-xxxxx   Running
```

To sab sahi h.

---

# 9. Metrics check kaise kare

Command:
```bash
kubectl top pods
```

Example:
```text
NAME        CPU   MEMORY
express-1   20m   50Mi
express-2   70m   90Mi
```

---

# 10. Resource Requests aur Limits

HPA ko scaling ke liye CPU requests chahiye hoti h.

Deployment me add karo:

```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"

  limits:
    cpu: "500m"
    memory: "256Mi"
```

---

## requests kya h?
Minimum guaranteed resources.

Example:
```text
cpu: 100m
```

Matlab minimum 0.1 CPU reserve.

---

## limits kya h?
Maximum allowed resources.

Example:
```text
cpu: 500m
```

Matlab pod max 0.5 CPU use kar sakta h.

---

# 11. HPA create kaise kare

Command:
```bash
kubectl autoscale deployment express-deployment --cpu-percent=50 --min=3 --max=8
```

---

## Iska meaning

| Option | Meaning |
|---|---|
| --cpu-percent=50 | CPU 50% cross hui to scale |
| --min=3 | Minimum 3 pods |
| --max=8 | Maximum 8 pods |

---

# 12. HPA check kaise kare

Command:
```bash
kubectl get hpa
```

Example:
```text
NAME                 TARGETS   MINPODS   MAXPODS   REPLICAS
express-deployment   20%/50%   3         8        3
```

---

# 14. Complete Flow

```text
Docker Image
      ↓
Deployment
      ↓
Pods
      ↓
Metrics Server
      ↓
HPA
      ↓
Auto Scaling
```

---

# 15. Important Commands

## Pods check
```bash
kubectl get pods
```

## Deployments check
```bash
kubectl get deployment
```

## Services check
```bash
kubectl get service
```

## HPA check
```bash
kubectl get hpa
```

## CPU usage check
```bash
kubectl top pods
```

## Watch pods live
```bash
kubectl get pods -w
```

---

# 16. Easy Real-Life Analogy
| Kubernetes Component | Real Life Example |
|---|---|
| Pod | Worker |
| Deployment | Team Manager |
| Service | Reception |
| Metrics Server | CCTV / Monitoring |
| HPA | Smart Manager |
| Auto Scaling | New workers hire karna |

