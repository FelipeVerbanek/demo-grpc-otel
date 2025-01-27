# API de Demonstração com OpenTelemetry

Esta é uma API de demonstração desenvolvida com o propósito de explorar a instrumentação de aplicações usando OpenTelemetry. A API permite o cadastro de usuários e a criação de pedidos, comunicando-se com um serviço gRPC para processamento de dados.

## Funcionalidades

- **Retornar cotação dolar**: Rota que retorna cotação dolar de uma api publica e salva no redis por 60 segundos

## Estrutura da Aplicação

1. **API HTTP**: Desenvolvida em Node.js e instrumentada com OpenTelemetry para rastreamento de requisições HTTP.
2. **Serviço gRPC**: Um microserviço que recebe e processa as solicitações da API.
3. **Instrumentação com OpenTelemetry**: Rastreia e coleta métricas de desempenho, como latência de requisição e tempo de resposta, com exportação de traces para análise.

## Requisitos

- **Node.js** versão 20+
- **Docker** para configurar dependências
- **OpenTelemetry** para coleta e exportação de métricas

## Configuração e Instalação

### 1. Clone o Repositório

```bash
git clone git@github.com:FelipeVerbanek/demo-grpc-otel.git
cd demo-grpc-otel
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Iniciar a API

Para rodar a aplicação:

```bash
npm dev
```

### 4. Build Docker
```bash
docker build -t demo-grpc-otel:1.0.0 .
```

## Monitoramento e Observabilidade

Esta API está instrumentada com OpenTelemetry para coletar métricas e traces de desempenho, que podem ser enviados para ferramentas como Prometheus e Grafana para visualização e análise.
