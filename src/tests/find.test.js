import React from "react";
import sinon from "sinon";
import { toHaveNoViolations } from "jest-axe";
import { shallow } from "enzyme";
import Endpoint from "./Endpoint";
import thunk from "redux-thunk";
import configStore from "redux-mock-store";

const mockStore = configStore([thunk]);
expect.extend(toHaveNoViolations);

describe("Endpoint", () => {
    let shallowWrapper,store;
    /*
     * Testing errors raised via custom propTypes can be done
     * by using sinon and catching console.error
     */
    beforeEach(() => {
        sinon.stub(console, "error");
        store = mockStore({
        //   piCorpSetUpReducer: {
        //     waitMsg: false,
        //     isPanelOpen:true,
        //     selectedRows:{stmtType:"Billing", emailStmtSummary:"Yes", emailCardHolderRecon:"No"}, vtaCustomer: true
        //   }
        });
        
      });
    
      // While not forgetting to restore it afterwards
      afterEach(() => {

        // eslint-disable-next-line no-console
        console.error.restore();
      });

    describe("Endpoint render correctly", () => {
        it("verify Panel render correctly", async () => {
            const shallowWrapper = shallow(<Endpoint/>);            
           // shallowWrapper.setProps({isPanelOpen:true, selectedRows:{stmtType:"Billing", emailStmtSummary:"Yes", emailCardHolderRecon:"No"}, vtaCustomer: true})
            console.log("test" ,shallowWrapper.debug())
            const child = shallowWrapper.find('Bar');
            expect(child).toHaveLength(1);
        });

        // it("verify FormComponent render correctly", async () => {
        //     const shallowWrapper = shallow(<PIEndpointSetupStmtEditDetailsPanel store={store}/>).dive().dive()
        //     shallowWrapper.setProps({isPanelOpen:true})
        //     const child = shallowWrapper.find('FormComponent');
        //     expect(child).toHaveLength(1);
        // });

        // it("verify Feedback component present", async () => {
        //     const shallowWrapper = shallow(<PIEndpointSetupStmtEditDetailsPanel store={store}/>).dive().dive()
        //     shallowWrapper.setProps({isPanelOpen:true})
        //     const child = shallowWrapper.find('ForwardRef(FeedbackComponent)');
        //     expect(child).toHaveLength(0);
        // });

        // it("verify Select render correctly", async () => {
        //     const shallowWrapper = shallow(<PIEndpointSetupStmtEditDetailsPanel store={store}/>).dive().dive()
        //     shallowWrapper.setProps({isPanelOpen:true})
        //     shallowWrapper.setState({
        //         stmtType: "",
        //         emailStmtSummary: "",
        //         emailCardHolderRecon: ""
        //     });
        //     const child = shallowWrapper.find('Select');
        //     expect(child).toHaveLength(1);
        // });

        // it("verify Checkbox render correctly", async () => {
        //     const shallowWrapper = shallow(<PIEndpointSetupStmtEditDetailsPanel store={store}/>).dive().dive()
        //     shallowWrapper.setProps({isPanelOpen:true})
        //     shallowWrapper.setState({
        //         stmtType: "",
        //         emailStmtSummary: "",
        //         emailCardHolderRecon: ""
        //     });
        //     const child = shallowWrapper.find('Checkbox');
        //     expect(child).toHaveLength(2);
        // });

        // it("verify Buttons render correctly", async () => {
        //     const shallowWrapper = shallow(<PIEndpointSetupStmtEditDetailsPanel store={store}/>).dive().dive()
        //     shallowWrapper.setProps({isPanelOpen:true})
        //     const child = shallowWrapper.find('Button');
        //     expect(child).toHaveLength(2);
        // });
    });
});

