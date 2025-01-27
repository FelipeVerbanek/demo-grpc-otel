# Deploy de Aplicação gRPC e Redis no Kubernetes

Este guia descreve a estrutura e as instruções para o deploy de uma aplicação gRPC e do Redis no Kubernetes, utilizando arquivos de configuração para **Service** e **Deployment**.

## Estrutura das Pastas

- **`grpc/`**: Contém os manifests para o deploy da aplicação gRPC.
  - `deployment.yaml`: Configura o Deployment da aplicação gRPC.
  - `service.yaml`: Configura o Service para expor a aplicação.

- **`redis/`**: Contém os manifests para o deploy do Redis.
  - `deployment.yaml`: Configura o Deployment do Redis.
  - `service.yaml`: Configura o Service para expor o Redis.

## Descrição dos Recursos

### Aplicação gRPC

#### Deployment
Define os pods que executam a aplicação gRPC, incluindo:
- A imagem do container da aplicação.
- Configurações de réplicas.
- Configuração de variáveis de ambiente, volumes, etc.

#### Service
Exponibiliza a aplicação gRPC para outros serviços no cluster ou externamente. Inclui:
- Tipo do serviço (ClusterIP, NodePort, ou LoadBalancer).
- Configuração de portas para o tráfego gRPC.

### Redis

#### Deployment
Define os pods para o Redis, incluindo:
- A imagem oficial do Redis.
- Configurações de persistência de dados (se aplicável).
- Recursos de limite de CPU e memória.

#### Service
Exponibiliza o Redis para ser acessado pela aplicação gRPC ou outros serviços. Inclui:
- Tipo do serviço (ClusterIP).
- Porta padrão do Redis (6379).

## Instruções de Deploy

1. **Aplicação gRPC**:
   - Acesse o diretório `grpc/`.
   - Aplique os manifests do Deployment e do Service:
     ```bash
     kubectl apply -f deployment.yaml
     kubectl apply -f service.yaml
     ```

2. **Redis**:
   - Acesse o diretório `redis/`.
   - Aplique os manifests do Deployment e do Service:
     ```bash
     kubectl apply -f deployment.yaml
     kubectl apply -f service.yaml
     ```

3. **Verifique os Recursos Criados**:
   - Confirme os pods em execução:
     ```bash
     kubectl get pods
     ```
   - Confirme os services criados:
     ```bash
     kubectl get services
     ```