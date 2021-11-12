/* eslint-disable */
import React, { Component,PureComponent } from "react";
import "./home.scss";
import DataTable from "react-data-table-component";
import Spin from '../../common/components/spin/Spin';
import { AreaChart, Area, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { PieChart, Pie, BarChart, Bar, Legend, ResponsiveContainer, Treemap, Cell } from 'recharts';

class CustomizedContent extends PureComponent {
  render() {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  }
}

class Home extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      policy: [
        {
          policy_id: 0,
          date_of_purchase: 0,
          customer_id: 0,
          fuel: 0,
          vehicle_segment: 0,
          premium: 0,
          bodily_injury_liability: 0,
          personal_injury_protection: 0,
          property_damage_liability: 0,
          collision: 0,
          comprehensive: 0,
          customer_gender: 0,
          customer_income_group: 0,
          customer_region: 0,
          customer_marital_status: 0,
        },
      ],
      filter_policy: [
        {
          policy_id: 0,
          date_of_purchase: '',
          customer_id: 0,
          fuel: '',
          vehicle_segment: '',
          premium: 0,
          bodily_injury_liability: '',
          personal_injury_protection: '',
          property_damage_liability: '',
          collision: '',
          comprehensive: '',
          customer_gender: '',
          customer_income_group: '',
          customer_region: '',
          customer_marital_status: '',
        }
      ],
      area: [{
        premium:0,
        date_of_purchase:''
      }],
      bar: [{
        premium:0,
        customer_income_group: ''
      }],
      mond_pie: [{
        premium:0,
        month_of_purchase:''
      }],
      pie:[{
        premium:0,
        customer_region:''
      }]
    };
  }
  componentDidMount() {
    var apiUrl =
      "https://je2wry0rch.execute-api.us-east-2.amazonaws.com/dev/v1/policy/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({ loader: false, policy: data['policy'], filter_policy: data['policy'], 
      area:data['area_chart'],bar:data['bar_chart'],mond_pie: data['data_mon'],pie: data['pie_chart']
    }));
  }

  filter_data = event => {
    if (event.target.value === '' || event.target.value === ' '){
      this.setState({ filter_policy: this.state.policy })
    }else{
      let regex = new RegExp(`^.*${event.target.value}.*$`, 'i'); 	
      let udata = this.state.policy.filter(
        data => regex.test(data.policy_id) || regex.test(data.customer_id)
      )
      this.setState({ filter_policy: udata
      })
    }
  }

  
  render() {
    const columns = [
      {
        name: "policy_id",
        cell: row => (
          <a href={`/policy/${row.policy_id}`} target="_blank" rel="noopener noreferrer">
            {row.policy_id}
          </a>
        ),
    
      },
      {
        name: "date_of_purchase",
        selector: (row) => row.date_of_purchase,
      },
      {
        name: "customer_id",
        selector: (row) => row.customer_id,
      },
      {
        name: "fuel",
        selector: (row) => row.fuel,
      },
      {
        name: "vehicle_segment",
        selector: (row) => row.vehicle_segment,
      },
      {
        name: "premium",
        selector: (row) => row.premium,
      },
      {
        name: "bodily_injury_liability",
        selector: (row) => row.bodily_injury_liability,
      },
      {
        name: "personal_injury_protection",
        selector: (row) => row.personal_injury_protection,
      },
      {
        name: "property_damage_liability",
        selector: (row) => row.property_damage_liability,
      },
      {
        name: "collision",
        selector: (row) => row.collision,
      },
      {
        name: "comprehensive",
        selector: (row) => row.comprehensive,
      },
      {
        name: "customer_gender",
        selector: (row) => row.customer_gender,
      },
      {
        name: "customer_income_group",
        selector: (row) => row.customer_income_group,
      },
      {
        name: "customer_region",
        selector: (row) => row.customer_region,
      },
      {
        name: "customer_marital_status",
        selector: (row) => row.customer_marital_status,
      },
    ];
    const style = {
      top: '50%',
      right: 0,
      transform: 'translate(0, -50%)',
      lineHeight: '24px',
    };
    const COLORS = ['#8889DD', '#8DC77B', '#9597E4', '#E2CF45', '#A5D297', '#F8C12D','#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 'pink'];
    return (
      <div className="menu">
        <Spin loading={this.state.loader}>
        <AreaChart width={1400} height={400} data={this.state.area}>
          <Tooltip/>
          <Area type="monotone" dataKey="premium" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date_of_purchase" />
          <YAxis />
        </AreaChart>
        <PieChart width={500} height={500} >
          <Pie data={this.state.pie} nameKey="customer_region" dataKey="premium" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label >
            {this.state.pie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}  
          </Pie>
          <Tooltip/>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </PieChart>
        <div style={{width:'5em',display:'inline-block'}}></div>
        <BarChart width={400} height={400} data={this.state.bar}>
          <Bar dataKey="premium" fill="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="customer_income_group" />
          <YAxis />
          <Tooltip/>
        </BarChart>
        <div style={{width:'5em',display:'inline-block'}}></div>
        <PieChart width={400} height={400}>
          {console.log(this.state.mond_pie)}
          <Pie data={this.state.mond_pie} nameKey="month_of_purchase"  dataKey="premium" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label >
            {this.state.mond_pie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
          <Tooltip/>
        </PieChart>
        <hr/>
        <h6>*Click on Policy id to modify details</h6>
        <br/>
        Filter by <b>Policy / customer id</b> <input type="text" onChange={this.filter_data} />
        <DataTable columns={columns} data={this.state.filter_policy} pagination persistTableHead />
        </Spin>
      </div>
    );
  }
}

export default Home;
