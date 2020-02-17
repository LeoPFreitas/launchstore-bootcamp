module.exports = {
  date(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hour = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);

    // return `${year}-${month}-${day}`  // iso
    return {
      day,
      month,
      year,
      hour,
      minutes,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    };
  },
  formatPrice(price) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(price / 100);
  },
  formatCpfCnpj(value) {
    value = value.replace(/\D/g, "");

    if (value.length > 14) value = value.slice(0, -1);

    // check if is cfp
    if (value.length > 11) {
      //cnpj 11.222.333/0001-11 --> 14 digitos
      value = value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    } else {
      //cpf 470.654.449-33
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return value;
  },
  formatCep(value) {
    value = value.replace(/\D/g, "");

    if (value.length > 8) value = value.slice(0, -1);

    value = value.replace(/(\d{5})(\d)/, "$1-$2");

    return value;
  }
};
