<template>
    <v-row align="center">
        <v-col md="4" class="mx-auto">
            <v-date-picker style="width:100%" v-model="dataSelecionada" @change="mudarData()"></v-date-picker>
        </v-col>
        <v-col md="12">
            <v-card class="mx-auto" md="12" max-width="600" tile>
                <canvas id="horas"></canvas>
            </v-card>
        </v-col>
        <v-col md="12">
            <v-card class="mx-auto" md="12" max-width="600" tile>
                <canvas id="reservas"></canvas>

            </v-card>
        </v-col>
        <v-col md="12">
            <v-card class="mx-auto" md="12" max-width="600" tile>
                <canvas id="valor"></canvas>

            </v-card>
        </v-col>
    </v-row>

</template>

<script>
    var json = require('./dados.json');
    var moment = require('moment');
    var Chart = require('chart.js');
    var chartHoras, chartReservas, chartValor;
    export default {
        data: () => ({
            moment: moment,
            dataSelecionada: new Date().toISOString().substr(0, 10),
        }),
        methods: {
            loadHorasUtilizadas() {
                const data = this.dataSelecionada;
                const valores = json.reservas.filter((reserva) => {
                    return reserva.start.indexOf(data) !== -1;
                });
                if (valores.length > 0) {
                    const horasValores = valores.map((reserva) => {
                        const aux = moment(reserva.end, "DD-MM-YYYY HH:mm").diff(moment(reserva.start,
                            "DD-MM-YYYY HH:mm"));
                        const horas = moment.duration(aux);
                        return horas.asHours()
                    })
                    const totalHorasUtilizadas = horasValores.reduce((total, hora) => {
                        return total + hora
                    })
                    var horaTotalQuadra = json.quadras[0].total_horas_disponiveis;
                    chartHoras.data.datasets[0].data = [100 - totalHorasUtilizadas / horaTotalQuadra * 100,
                        totalHorasUtilizadas / horaTotalQuadra * 100
                    ];
                    chartHoras.update();

                }

            },
            loadTotalDeReservas() {
                const data = this.dataSelecionada;
                var dataChart = [];
                var labels = []

                for (var i = 0; i < 7; i++) {
                    let dataDoDia = moment(data).subtract(i, 'days');
                    dataDoDia = dataDoDia.format("YYYY-MM-DD")
                    const valores = json.reservas.filter((reserva) => {
                        return reserva.start.indexOf(dataDoDia) !== -1;
                    });
                    dataChart.push(valores.length);
                    labels.push(dataDoDia);
                }
                chartReservas.data.datasets[0].data = dataChart;
                chartReservas.data.labels = labels;
                chartReservas.update();

            },
            loadValor() {
                const data = this.dataSelecionada;
                var dataChart = [];
                var labels = []
                for (var i = 0; i < 7; i++) {
                    let dataDoDia = moment(data).subtract(i, 'days');
                    dataDoDia = dataDoDia.format("YYYY-MM-DD")
                    const valores = json.reservas.filter((reserva) => {
                        return reserva.start.indexOf(dataDoDia) !== -1;
                    });
                    const valorReservas = valores.map((reserva) => {
                        return reserva.valor_pago
                    })
                    let totalValorDia = 0;
                    if(valores.length > 0){
                        totalValorDia = valorReservas.reduce((total, valor_pago) => {
                            return total + valor_pago
                        })
                    }else{
                        totalValorDia = 0
                    }
                    dataChart.push(totalValorDia);
                    labels.push(dataDoDia);
                }
                chartValor.data.datasets[0].data = dataChart;
                chartValor.data.labels = labels;
                chartValor.update();

            },
            mudarData() {
                this.loadHorasUtilizadas();
                this.loadTotalDeReservas();
                this.loadValor();
            }
        },
        created() {

        },
        mounted() {
            var ctx = document.getElementById('horas').getContext('2d');
            chartHoras = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [],
                        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 199, 132)']
                    }],
                    labels: [
                        'Tempo Disponivel da Quadra',
                        'Tempo Utilizado da Quadra',
                    ]
                },
                options: {}
            });
            var ctx = document.getElementById('reservas').getContext('2d');
            chartReservas = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{
                        data: [],
                        backgroundColor: ['rgb(139, 0, 255)', 'rgb(75, 0, 130)', 'rgb(0, 0, 255)',
                            'rgb(0, 255, 0)', 'rgb(173, 255, 47)', 'rgb(255, 165, 0)',
                            'rgb(255, 0, 0)'
                        ],
                        minBarLength: 2,
                        label: 'Numero de Reservas por dia'
                    }],
                    labels: [],
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
            var ctx = document.getElementById('valor').getContext('2d');
            chartValor = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        data: [],
                        backgroundColor: ['rgb(139, 0, 255)', 'rgb(75, 0, 130)', 'rgb(0, 0, 255)',
                            'rgb(0, 255, 0)', 'rgb(173, 255, 47)', 'rgb(255, 165, 0)',
                            'rgb(255, 0, 0)'
                        ],
                        minBarLength: 2,
                        label: 'Faturamento diario'
                    }],
                    labels: [],
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
            this.loadHorasUtilizadas();
            this.loadTotalDeReservas();
            this.loadValor();
        }
    };

</script>

<style>

</style>
