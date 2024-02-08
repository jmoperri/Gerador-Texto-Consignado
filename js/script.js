function convertText() {
  var input = document.getElementById("inputarea").value;

  let contratoNumeroMatch = input.match(/(\d{9}-\d)/);
  let contratoNumero = contratoNumeroMatch ? contratoNumeroMatch[1] : null;

  let dataFormalizacaoMatch = input.match(/Data Base:\s*(\d{2}\/\d{2}\/\d{4})/);
  let dataFormalizacao = dataFormalizacaoMatch
    ? dataFormalizacaoMatch[1]
    : null;
  let qtdParcelasMatch = input.match(/Parcela Qtde:\s*(\d+)/);
  let qtdParcelas = qtdParcelasMatch ? qtdParcelasMatch[1] : null;

  let formaPagamentoMatch = input.match(
    /(TED|OP SANTANDER|OP CEF|OP ITAU|EP FGTS|PORTABILIDADE|LIB PIX CONSIGNADO|LIB CRED)/i
  );

  let formaPagamento = formaPagamentoMatch
    ? formaPagamentoMatch[1].toUpperCase()
    : "Forma de Pagamento Indefinida";

  let valorParcelaMensalMatch = input.match(/\s+\d+\s+[\d.,]+\s+([\d.,]+)/);
  let valorParcelaMensal = valorParcelaMensalMatch
    ? valorParcelaMensalMatch[1].replace(",", ".")
    : null;

  let valorPagoClienteMatch = input.match(/Valor Solicitado: ([\d.,]+)/);
  let valorPagoCliente = valorPagoClienteMatch
    ? valorPagoClienteMatch[1]
    : null;

  let dadosBancariosMatch = input.match(/\s+(\d+)\s+(\d+)\s+(\d+)-(\d+)/);
  let [banco, agencia, conta, digitoConta] = dadosBancariosMatch
    ? dadosBancariosMatch.slice(1)
    : [null, null, null, null];

  let promotoraMatch = input.match(/PROMOTORA: (\d+ - [^\r\n]+)/);
  let promotora = promotoraMatch ? promotoraMatch[1] : null;

  let codigoPromotoraMatch = promotora.match(/(\d+)/);
  let codigoPromotora = codigoPromotoraMatch ? codigoPromotoraMatch[1] : null;
  let corban = codigoPromotora
    ? `${codigoPromotora}@pancorrespondentes.com.br`
    : null;

  let parcelasCedidasMatch = input.match(
    /Existe\(m\) parcela\(s\) cedida\(s\) para a\(s\) cessão\(ões\): (.+)/
  );
  let parcelasCedidas = parcelasCedidasMatch
    ? parcelasCedidasMatch[1]
    : "Não há parcelas cedidas";

  let output = `Contrato ${contratoNumero}\n`;
  output += `data de formalização: ${dataFormalizacao}\n`;
  output += `Valor Parcela mensal: ${valorParcelaMensal}\n`;
  output += `Quantidade de Parcelas: ${qtdParcelas}\n`;
  output += `Forma de Pagamento: ${formaPagamento}\n`;
  output += `Valor pago ao cliente: ${valorPagoCliente}\n`;
  output += `Dados Bancários: Banco ${banco}, agência ${agencia} e conta ${conta}-${digitoConta}\n`;
  output += `Promotora: PROMOTORA: ${promotora}\n`;
  output += `Corban: ${corban}\n`;
  output += `Existe(m) parcela(s) cedida(s) para a(s) cessão(ões): ${parcelasCedidas}\n`;
  output +=
    "Constam xxxx  parcelas pagas por desconto em folha. Saldo devedor xxxx.\n";
  output += "Atualmente o contrato encontra-se em aberto e em dia\n";
  output +=
    "A causa real definitiva será incluída após análise da equipe de prevenção a fraudes.\nFim.";

  document.getElementById("outputarea").innerHTML = output;
}

function copyOutput() {
  // Seleciona o texto na caixa de texto de saída
  var outputTextarea = document.getElementById("outputarea");
  outputTextarea.select();
  
  document.execCommand("copy");  

  outputTextarea.setSelectionRange(0, 0);
}
