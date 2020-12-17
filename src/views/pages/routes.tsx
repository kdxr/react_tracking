import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Module from '../pages/modules';
import Tracking from '../pages/tracking';
import History from './history/history';
import Costfrom from '../../views/pages/cost/index'
import Costdetail from '../../components/costDetail/costDetail'
import Preview from './PDF/Document'
import Summary from './summary'
import cardDetail from '../../components/cardDetail/cardDtail'
import CompanyList from '../pages/cardCompany/index'

const Index = () => {
    
    return (
        <Switch>
            <Route exact path="/" component={CompanyList}/>
            <Route path="/module" component={Module} /> 
            <Route path="/history" component={History} />
            <Route path="/preview" component={Preview} /> ่่่
            <Route path="/cost" component={Costfrom} /> 
            <Route path="/summary" component={Summary} /> 
            <Route path="/costdetail" component={Costdetail} />
            <Route path="/cardDetail" component={cardDetail} />
            <Route path="/tracking" component={Tracking} />
            
        </Switch>
    )
}

export default Index;
