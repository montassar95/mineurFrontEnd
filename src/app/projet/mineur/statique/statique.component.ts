import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { Chart } from "chart.js";
import { DatePipe } from "@angular/common";
import { FormBuilder } from "@angular/forms";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { EventService } from "src/app/demo/service/eventservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { StatisticsDTO } from "src/app/domain/statisticsDTO";
import * as Highcharts from "highcharts";
import { Etablissement } from "src/app/domain/etablissement";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-statique",
  templateUrl: "./statique.component.html",
  styleUrls: ["./statique.component.css"],
})
export class StatiqueComponent implements OnInit {
  displayCentre: boolean;
  valid: boolean;
  centreLibelle: string;
  showListCentre() {
    this.displayCentre = true;
  }
  entitiesEtablissement: Etablissement[];
  centre: Etablissement;
  saveCentre(centre) {
    // this.centre.id;
    this.centre = centre;
    this.centreLibelle = this.centre?.libelle_etablissement;
    this.displayCentre = false;
    this.crudservice.calculerStatistiques(this.centre.id).subscribe((data) => {
      if (data.result !== null) {
        this.valid = true;
        this.statisticsDTO = data.result;
        console.log(this.statisticsDTO);
        this.arretOuJuge(
          this.statisticsDTO.nbrArret,
          this.statisticsDTO.nbrJuge,
          this.statisticsDTO.nbrDebutant,
          this.statisticsDTO.nbrAncien,
          this.statisticsDTO.nbrAll,
          this.statisticsDTO.nbrEtrange,
          this.statisticsDTO.nbrAge13,
          this.statisticsDTO.nbrAge14,
          this.statisticsDTO.nbrAge15,
          this.statisticsDTO.nbrAge16,
          this.statisticsDTO.nbrAge17,
          this.statisticsDTO.nbrAge18,
          this.statisticsDTO.nbrIgnorant,
          this.statisticsDTO.nbrPrimaire,
          this.statisticsDTO.nbrPrepa,
          this.statisticsDTO.nbrSecondaire,
          this.statisticsDTO.nbrFormation,
          this.statisticsDTO.nbrEtudiant,

          this.statisticsDTO.nbrSiFaAvec,
          this.statisticsDTO.nbrSiFaParentSepa,
          this.statisticsDTO.nbrSiFaOrphelinPe,
          this.statisticsDTO.nbrSiFaOrphelinMe,
          this.statisticsDTO.nbrSiFaOrphelinPeMe,
          this.statisticsDTO.nbrSiFaCasSoci
        );
      }
    });
  }

  title = "myHighchart";
  chartOptions1: any;
  chartOptionsArrete: any;
  chartOptionsJuge: any;
  highcharts = Highcharts;

  chartOptions5: any;
  chartOptions4: any;
  chartOptions7 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: " الداخــــــــلون   ",
      // text: "Browser<br>shares<br>2017",
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
            fontSize: "23px",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        innerSize: "50%",
        data: [
          ["فعلــــــــي ", 58.9],
          ["غير فعلــــــــي ", 13.29],

          // {
          //   name: "Other",
          //   y: 7.61,
          //   dataLabels: {
          //     enabled: false,
          //   },
          // },
        ],
      },
    ],
  };
  chartOptions8 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "الخارجــــــــون ",
      // text: "Browser<br>shares<br>2017",
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
            fontSize: "23px",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        innerSize: "50%",
        data: [
          ["فعلــــــــي ", 58.9],
          ["غير فعلــــــــي ", 13.29],

          // {
          //   name: "Other",
          //   y: 7.61,
          //   dataLabels: {
          //     enabled: false,
          //   },
          // },
        ],
      },
    ],
  };
  chartOptions9 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "الفـــــــــــارون    ",
      // text: "Browser<br>shares<br>2017",
      align: "center",
      verticalAlign: "middle",
      y: 60,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
            fontSize: "23px",
          },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "75%"],
        size: "110%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Browser share",
        innerSize: "50%",
        data: [
          ["قديــــــــم ", 58.9],
          ["جديــــــــد  ", 13.29],

          // {
          //   name: "Other",
          //   y: 7.61,
          //   dataLabels: {
          //     enabled: false,
          //   },
          // },
        ],
      },
    ],
  };

  lineData: any;

  barData: any;

  pieData: any;

  polarData: any;

  radarData: any;

  statisticsDTO: StatisticsDTO;

  basicData: {
    labels: string[];
    datasets: { label: string; backgroundColor: string; data: number[] }[];
  };
  chartOptions6: any;
  chartOptions2: any;
  chartOptions3: any;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private crudservice: CrudEnfantService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private token: TokenStorageService,
    public datepipe: DatePipe,
    private nodeService: NodeService
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال" },
      { label: "الاحصائيات ", routerLink: ["/mineur/Statique"] },
    ]);
  }

  ngOnInit() {
    this.saveCentre(this.token?.getUser()?.etablissement);
    this.crudservice
      .trouverEtablissementsActifs("etablissement")
      .subscribe((data) => {
        this.entitiesEtablissement = data.result;
        let e = new Etablissement();
        e.libelle_etablissement = "جميع مراكز الإصلاح";
        e.id = 0;
        this.entitiesEtablissement.push(e);
      });
  }

  arretOuJuge(
    ar: number,
    ju: number,
    de: number,
    an: number,
    tu: number,
    et: number,
    ag13: number,
    ag14: number,
    ag15: number,
    ag16: number,
    ag17: number,
    ag18: number,

    ig: number,
    pri: number,
    pre: number,
    se: number,
    fo: number,
    etu: number,
    avec: number,
    sepa: number,
    orPer: number,
    orMe: number,
    orPerMe: number,
    cas: number
  ) {
    this.chartOptionsArrete = {
      chart: {
        type: "bar",
      },
      title: {
        // text: "الموقوفين حسب القضية الرئيسية ",
        // color: "black",
        // fontSize: "25px",
        // fontWeight: "bold",
        style: {
          display: "none",
        },
      },

      // subtitle: {
      //   text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
      // },
      xAxis: {
        categories: Object.keys(this.statisticsDTO.typeAffairesArrete),
        title: {
          text: null,
        },
        labels: {
          overflow: "justify",
          style: {
            color: "red",
            fontSize: "18px",
            fontWeight: "bold",
          },
        },
        opposite: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "الأطفال",
          align: "high",
        },
        labels: {
          overflow: "justify",
          style: {
            color: "red",
            fontSize: "18px",
          },
        },
        reversed: true,
      },
      tooltip: {
        valueSuffix: " --",
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      // legend: {
      //   layout: "vertical",
      //   align: "right",
      //   verticalAlign: "middle",
      //   borderWidth: 0,
      // },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "طفل ",
          data: Object.values(this.statisticsDTO.typeAffairesArrete),
        },
        // {
        //   name: "Year 1900",
        //   data: [133, 156, 947, 408, 6],
        // },
        // {
        //   name: "Year 2000",
        //   data: [814, 841, 3714, 727, 31],
        // },
        // {
        //   name: "Year 2016",
        //   data: [1216, 1001, 4436, 738, 40],
        // },
      ],
    };

    this.chartOptionsJuge = {
      chart: {
        type: "bar",
      },
      title: {
        // text: "المحكومين حسب القضية الرئيسية    ",
        // color: "black",
        // fontSize: "25px",
        // fontWeight: "bold",
        style: {
          display: "none",
        },
      },

      // subtitle: {
      //   text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
      // },
      xAxis: {
        categories: Object.keys(this.statisticsDTO.typeAffairesJuge),
        title: {
          text: null,
        },
        labels: {
          overflow: "justify",
          style: {
            color: "green",
            fontSize: "18px",
            fontWeight: "bold",
          },
        },
        opposite: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "الأطفال ",
          align: "high",
        },
        labels: {
          overflow: "justify",
          style: {
            color: "red",
            fontSize: "18px",
          },
        },
        reversed: true,
      },
      tooltip: {
        valueSuffix: " --",
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      // legend: {
      //   layout: "vertical",
      //   align: "right",
      //   verticalAlign: "middle",
      //   borderWidth: 0,
      // },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "طفل ",
          data: Object.values(this.statisticsDTO.typeAffairesJuge),
        },
        // {
        //   name: "Year 1900",
        //   data: [133, 156, 947, 408, 6],
        // },
        // {
        //   name: "Year 2000",
        //   data: [814, 841, 3714, 727, 31],
        // },
        // {
        //   name: "Year 2016",
        //   data: [1216, 1001, 4436, 738, 40],
        // },
      ],
    };
    this.chartOptions1 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      credits: {
        enabled: false,
      },
      title: {
        // text: "حسب الوضعية الجزائية ",
        // color: "black",
        // fontSize: "25px",
        // fontWeight: "bold",
        style: {
          display: "none",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format:
              '<b style="font-size:20px">{point.name} </b> : <b style="font-size:18px">{point.y}  طفل  </b>',
          },
        },
      },
      series: [
        {
          // name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: "الموقوفين",
              y: ar,
              sliced: true,
              selected: true,
              color: "red",
            },
            {
              name: "المحكومين",
              y: ju,
              color: "green",
            },
          ],
        },
      ],
    };

    this.chartOptions5 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      credits: {
        enabled: false,
      },
      title: {
        // text: "حسب  الصنف الجزائي  ",
        // color: "black",
        // fontSize: "25px",
        // fontWeight: "bold",
        style: {
          display: "none",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format:
              '<b style="font-size:20px">{point.name} </b> : <b style="font-size:18px">{point.y} طفل</b>',
          },
        },
      },
      series: [
        {
          // name: "Brands",
          // colorByPoint: true,
          data: [
            {
              name: "المبتدئون",
              y: de,
              sliced: true,
              selected: true,
              color: "grey",
            },
            {
              name: "العائدون",
              y: an,
              color: "#0000FF",
            },
          ],
        },
      ],
    };

    this.chartOptions6 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      credits: {
        enabled: false,
      },
      title: {
        // text: " حسب الجنسيات",
        // color: "black",
        // fontSize: "50px",
        // fontWeight: "bold",
        style: {
          display: "none",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format:
              '<b style="font-size:20px">{point.name} </b> : <b style="font-size:18px">{point.y} طفل</b>',
          },
        },
      },
      series: [
        {
          // name: "Brands",
          // colorByPoint: true,
          data: [
            {
              name: "تونسيون ",
              y: tu,
              color: "rgb(241, 92, 128)",
            },
            {
              name: "اجانب",
              y: et,
              sliced: true,
              selected: true,
              color: "rgb(247, 163, 92)",
            },
          ],
        },
      ],
    };

    this.chartOptions2 = {
      chart: {
        type: "column",
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}%",
          },
        },
      },
      xAxis: {
        type: "category",
        labels: {
          style: {
            color: "black",
            fontSize: "14px",
          },
        },
        reversed: true,
      },

      yAxis: {
        title: {
          text: "    عدد الأطفال ",
          opposite: true,
        },
        labels: {
          style: {
            color: "black",
            fontSize: "14px",
          },
        },
        opposite: true,
      },

      title: {
        // text: "     حسب السن",
        // color: "black",
        // fontSize: "50px",
        // fontWeight: "bold",
        // opposite: true,
        style: {
          display: "none",
        },
      },

      legend: {
        // opposite: true,
        enabled: false,
      },

      // tooltip: {
      //   useHTML: true,
      // },
      tooltip: {
        headerFormat: '<span style="font-size:15px">  مجموع الأطفال</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}:</span>  <b>{point.y}</b>  <br/>',
      },
      series: [
        {
          name: "  عــــام",
          data: [
            {
              name: "الســـن 13 ",
              y: ag13,
              drilldown: "الســـن 13 ",
              color: "#ef8d8d",
            },
            {
              name: "الســـن 14 ",
              y: ag14,
              drilldown: "الســـن 14 ",
              color: "#e54848",
            },
            {
              name: "الســـن 15 ",
              y: ag15,
              drilldown: "الســـن 15 ",
              color: "#df1b1b",
            },
            {
              name: "الســـن 16 ",
              y: ag16,
              drilldown: "الســـن 16 ",
              color: "#9c1212",
            },
            {
              name: "الســـن 17 ",
              y: ag17,
              drilldown: "الســـن 17 ",
              color: "#420808",
            },
            {
              name: "الســـن 18 ",
              y: ag18,
              drilldown: "الســـن 18 ",
              color: "#FFFFFF",
            },
          ],

          dataLabels: {
            enabled: true,
            format: "    {point.y}",
          },
        },
      ],
    };

    this.chartOptions3 = {
      chart: {
        type: "column",
      },
      credits: {
        enabled: false,
      },
      title: {
        // align: "center",
        // text: "حسب المستوى التعليمي",
        // color: "black",
        // fontSize: "25px",
        // fontWeight: "bold",
        style: {
          display: "none",
        },
      },
      subtitle: {
        align: "left",
        // text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
        labels: {
          style: {
            color: "black",
            fontSize: "14px",
          },
        },
        reversed: true,
      },
      yAxis: {
        title: {
          text: "عدد الأطفال ",
          opposite: true,
        },
        labels: {
          style: {
            color: "black",
            fontSize: "14px",
          },
        },
        opposite: true,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 2,
          dataLabels: {
            enabled: true,
            format: "{point.y}",
            //  format: "{point.y:.1f}%",
          },
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:15px">  مجموع الأطفال</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}:</span>  <b>{point.y}</b>  <br/>',
      },
      // tooltip: {
      //   headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      //   pointFormat:
      //     '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      // },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: [
            {
              name: "أمي",
              y: ig,
              drilldown: "أمي",
            },
            {
              name: "إبتدائي",
              y: pri,
              drilldown: "إبتدائي",
            },
            {
              name: "إعدادي",
              y: pre,
              drilldown: "إعدادي",
            },
            {
              name: "ثانوي",
              y: se,
              drilldown: "ثانوي",
            },
            {
              name: "تكوين مهني",
              y: fo,
              drilldown: "تكوين مهني",
            },
            {
              name: "طالب",
              y: etu,
              drilldown: "طالب",
            },
          ],
        },
      ],
    };

    this.chartOptions4 = {
      chart: {
        type: "column",
      },
      credits: {
        enabled: false,
      },
      title: {
        // align: "center",
        // text: "حسب   الحــالة العائلية",
        // color: "black",
        // fontSize: "25px",
        // fontWeight: "bold",
        style: {
          display: "none",
        },
      },
      subtitle: {
        align: "left",
        // text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: "category",
        labels: {
          style: {
            color: "black",
            fontSize: "12px",
          },
        },
        reversed: true,
      },
      yAxis: {
        title: {
          text: "عدد الأطفال ",
          opposite: true,
        },
        labels: {
          style: {
            color: "black",
            fontSize: "14px",
          },
        },
        opposite: true,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 2,
          dataLabels: {
            enabled: true,
            format: "{point.y}",
            //  format: "{point.y:.1f}%",
          },
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:15px">  مجموع الأطفال</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}:</span>  <b>{point.y}</b>  <br/>',
      },
      // tooltip: {
      //   headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      //   pointFormat:
      //     '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
      // },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: [
            {
              name: "مع العائلة",
              y: avec,
              drilldown: "مع العائلة",
            },
            {
              name: "أب وأم منفصلان	",
              y: sepa,
              drilldown: "أب وأم منفصلان	",
            },

            {
              name: "يتيم الاب",
              y: orPer,
              drilldown: "يتيم الاب",
            },
            {
              name: "يتيم الام",
              y: orMe,
              drilldown: "يتيم الام",
            },
            {
              name: "يتيم الابوين",
              y: orPerMe,
              drilldown: "يتيم الابوين ",
            },
            {
              name: "حالة اجتماعية",
              y: cas,
              drilldown: "حالة اجتماعية",
            },
          ],
        },
      ],
    };
  }
}
