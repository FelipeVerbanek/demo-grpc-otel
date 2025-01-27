import axios from 'axios';
import { trace, context, SpanStatusCode } from '@opentelemetry/api';
import opentelemetry from '@opentelemetry/api';


const meter = opentelemetry.metrics.getMeter('cotacao-grpc');


const requestDurationHistogram = meter.createHistogram('http_request_duration_seconds_cotacao', {
  description: 'Duration seconds cotacao',
  unit: 'milliseconds',
  valueType: 1,
  advice: {
    explicitBucketBoundaries: [10, 50, 100, 200,300, 400, 500, 600, 700, 800, 900,1000,2000,3000,4000,5000,6000,7000]
  }
});


export async function getPriceDolar() {
  const cotacao = 'USD'; // Adicionando o parâmetro cotação
  const url = `https://economia.awesomeapi.com.br/json/last/${cotacao}`;

  const tracer = trace.getTracer('FindPrice');
  const span = tracer.startSpan('getPriceDolar', {
    attributes: {
      'http.method': 'GET',
      'http.url': url,
      'cotacao': cotacao, // Atributo adicionado ao Span
    },
  });

  const startTime = Date.now(); // Medição do tempo inicial

  return context.with(trace.setSpan(context.active(), span), async () => {
    try {
      const response = await axios.get(url);
      span.setAttribute('http.status_code', response.status);
      span.setAttribute('cotacao', cotacao); // Adicionando cotação ao Span
      span.setStatus({ code: SpanStatusCode.OK });

      span.end();

      return response.data.USDBRL.bid;
    } catch (error: any) {

        span.recordException(error);
        span.setAttribute('cotacao', cotacao);
        span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
        span.end();
        throw error;
    } finally {
      const endTime = new Date().getTime();
      const executionTime = endTime - startTime;

      requestDurationHistogram.record(executionTime, { 
        'http.method': 'GET',
        'http.url': url, 
        'cotacao': cotacao,
      });
    }
  });
  
}
