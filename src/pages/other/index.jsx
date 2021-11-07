import React, { Component } from "react";
import Spin from '../../common/components/spin/Spin';
import axios from 'axios';
import "./other.scss";

export default class Other extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      policyId: this.props?.match?.params?.id,
      items:[{id:1}],
      policy_id:null,
      date_of_purchase:null,
      customer_id:null,
      fuel:null,
      vehicle_segment:null,
      premium:null,
      bodily_injury_liability:null,
      personal_injury_protection:null,
      property_damage_liability:null,
      collision:null,
      comprehensive:null,
      customer_gender:null,
      customer_income_group:null,
      customer_region:null,
      customer_marital_status:null,
    }
    console.log(this.state)
  }

  requestMaker = e => {
      var apiUrl = `https://je2wry0rch.execute-api.us-east-2.amazonaws.com/dev/v1/policy/${this.state.policyId}`;
      
      const payload = {
        "policy_id":this.state.policy_id,
        "date_of_purchase":this.state.date_of_purchase,
        "customer_id":this.state.customer_id,
        "fuel":this.state.fuel,
        "vehicle_segment":this.state.vehicle_segment,
        "premium":this.state.premium,
        "bodily_injury_liability":this.state.bodily_injury_liability,
        "personal_injury_protection":this.state.personal_injury_protection,
        "property_damage_liability":this.state.property_damage_liability,
        "collision":this.state.collision,
        "comprehensive":this.state.comprehensive,
        "customer_gender":this.state.customer_gender,
        "customer_income_group":this.state.customer_income_group,
        "customer_region":this.state.customer_region,
        "customer_marital_status":this.state.customer_marital_status
      }
      console.log(payload)
      axios.post(apiUrl,payload)
      .then(res => {
        alert('Inserted '+res.status)
      });
    }

  componentDidMount() {
    if (this.state.policyId) {
        var apiUrl = `https://je2wry0rch.execute-api.us-east-2.amazonaws.com/dev/v1/policy/${this.state.policyId}/`;
        fetch(apiUrl).then((response) => response.json()).then((data) => this.setState({
          loader:false,items:data['policy'],
          policy_id: data['policy'][0]['policy_id'],
          date_of_purchase: data['policy'][0]['date_of_purchase'],
          customer_id: data['policy'][0]['customer_id'],
          fuel: data['policy'][0]['fuel'],
          vehicle_segment: data['policy'][0]['vehicle_segment'],
          premium: data['policy'][0]['premium'],
          bodily_injury_liability: data['policy'][0]['bodily_injury_liability'],
          personal_injury_protection: data['policy'][0]['personal_injury_protection'],
          property_damage_liability: data['policy'][0]['property_damage_liability'],
          collision: data['policy'][0]['collision'],
          comprehensive: data['policy'][0]['comprehensive'],
          customer_gender: data['policy'][0]['customer_gender'],
          customer_income_group: data['policy'][0]['customer_income_group'],
          customer_region: data['policy'][0]['customer_region'],
          customer_marital_status: data['policy'][0]['customer_marital_status']
        }));
        console.log(this.state.items)
    } else {
        this.props.history.goBack();
    }
  }
  render(){
    return (
      <div className="otherBody">
          <h1>{this.state.policyId} H1 </h1>
          <a href="/"><div className="back"> &lt; Back</div></a>
          <Spin loading={this.state.loader}>
              <div className="item_details">
                <h4>
                  Policy ID : {this.state.items[0].policy_id} <br/>
                  Date of Purchase : {this.state.items[0].date_of_purchase}<br/>
                  Customer ID : {this.state.items[0].customer_id}<br/>
                </h4>
              <div className="inline_left" >fuel : </div><div className="inline" ><input key='1' type="text" value={this.state.fuel} onChange={(e) => this.setState({fuel:e.target.value}) } /></div>
              <br/><div className="inline_left" >vehicle_segment : </div><div className="inline" ><input key='2' type="text" value={this.state.vehicle_segment} onChange={(e) => this.setState({vehicle_segment:e.target.value}) } /></div>
              <br/><div className="inline_left" >premium : </div><div className="inline" ><input key='3' type="text" value={this.state.premium} onChange={(e) => this.setState({premium:e.target.value}) } /></div>
              <br/><div className="inline_left" >bodily_injury_liability : </div><div className="inline" ><input key='4' type="text" value={this.state.bodily_injury_liability} onChange={(e) => this.setState({bodily_injury_liability:e.target.value}) } /></div>
              <br/><div className="inline_left" >personal_injury_protection : </div><div className="inline" ><input key='5' type="text" value={this.state.personal_injury_protection} onChange={(e) => this.setState({personal_injury_protection:e.target.value}) } /></div>
              <br/><div className="inline_left" >property_damage_liability : </div><div className="inline" ><input key='6' type="text" value={this.state.property_damage_liability} onChange={(e) => this.setState({property_damage_liability:e.target.value}) } /></div>
              <br/><div className="inline_left" >collision : </div><div className="inline" ><input key='7' type="text" value={this.state.collision} onChange={(e) => this.setState({collision:e.target.value}) } /></div>
              <br/><div className="inline_left" >comprehensive : </div><div className="inline" ><input key='8' type="text" value={this.state.comprehensive} onChange={(e) => this.setState({comprehensive:e.target.value}) } /></div>
              <br/><div className="inline_left" >customer_gender : </div><div className="inline" ><input key='9' type="text" value={this.state.customer_gender} onChange={(e) => this.setState({customer_gender:e.target.value}) } /></div>
              <br/><div className="inline_left" >customer_income_group : </div><div className="inline" ><input key='10' type="text" value={this.state.customer_income_group} onChange={(e) => this.setState({customer_income_group:e.target.value}) } /></div>
              <br/><div className="inline_left" >customer_region : </div><div className="inline" ><input key='11' type="text" value={this.state.customer_region} onChange={(e) => this.setState({customer_region:e.target.value}) } /></div>
              <br/><div className="inline_left" >customer_marital_status : </div><div className="inline" ><input key='12' type="text" value={this.state.customer_marital_status} onChange={(e) => this.setState({customer_marital_status:e.target.value}) } /></div>
              <br/><div>Submit:</div><div><input type="button" value="Submit" onClick={this.requestMaker}/></div>
              </div>
          </Spin>
      </div>
    );
  }
}