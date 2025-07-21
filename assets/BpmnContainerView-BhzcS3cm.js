import{a as o,b as u,V as b,D as v,e as c,o as _,f as r,t as h,i as w}from"./vendor-DpYf_-LF.js";const g={__name:"BpmnViewer",props:{xml:String,activeNodeId:String,completedNodeIds:Array,completedFlowIds:Array},setup(l){const e=l,p=o(null);let a;async function d(i){var s,n;try{await a.importXML(i);const t=a.get("canvas");(s=e.completedNodeIds)==null||s.forEach(m=>{t.addMarker(m,"highlight-completed")}),(n=e.completedFlowIds)==null||n.forEach(m=>{t.addMarker(m,"highlight-completed")}),e.activeNodeId&&t.addMarker(e.activeNodeId,"highlight-current")}catch(t){console.error("加载 BPMN 失败：",t)}}return u(()=>{a=new b({container:p.value}),e.xml&&d(e.xml)}),v(()=>e.xml,d),(i,s)=>(_(),c("div",{ref_key:"canvasRef",ref:p,class:"bpmn-container"},null,512))}},N={__name:"ApprovalPanel",emits:["approve"],setup(l,{emit:e}){const p=e,a=[{id:"UserTask_1",name:"主管审批"},{id:"UserTask_2",name:"经理审批"}],d=o(0),i=o(a[d.value]);function s(n){p("approve",{node:i.value,result:n}),n&&d.value<a.length-1?(d.value++,i.value=a[d.value]):i.value={name:"流程结束"}}return(n,t)=>(_(),c("div",null,[r("h3",null,"当前审批节点："+h(i.value.name),1),r("button",{onClick:t[0]||(t[0]=m=>s(!0))},"同意"),r("button",{onClick:t[1]||(t[1]=m=>s(!1))},"拒绝")]))}},B=`<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                  id="Definitions_1"
                  targetNamespace="http://bpmn.io/schema/bpmn">

  <bpmn:process id="approvalProcess" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="申请提交"/>
    <bpmn:userTask id="UserTask_1" name="主管审批"/>
    <bpmn:userTask id="UserTask_2" name="经理审批"/>
    <bpmn:userTask id="UserTask_3" name="财务审批"/>
    <bpmn:endEvent id="EndEvent_1" name="结束"/>

    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="UserTask_1"/>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="UserTask_1" targetRef="UserTask_2"/>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="UserTask_2" targetRef="UserTask_3"/>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="UserTask_3" targetRef="EndEvent_1"/>
  </bpmn:process>

  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="approvalProcess">
      <bpmndi:BPMNShape id="StartEvent_1_di" bpmnElement="StartEvent_1">
        <dc:Bounds x="100" y="100" width="36" height="36"/>
      </bpmndi:BPMNShape>

      <bpmndi:BPMNShape id="UserTask_1_di" bpmnElement="UserTask_1">
        <dc:Bounds x="200" y="90" width="100" height="60"/>
      </bpmndi:BPMNShape>

      <bpmndi:BPMNShape id="UserTask_2_di" bpmnElement="UserTask_2">
        <dc:Bounds x="350" y="90" width="100" height="60"/>
      </bpmndi:BPMNShape>

      <bpmndi:BPMNShape id="UserTask_3_di" bpmnElement="UserTask_3">
        <dc:Bounds x="500" y="90" width="100" height="60"/>
      </bpmndi:BPMNShape>

      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="650" y="100" width="36" height="36"/>
      </bpmndi:BPMNShape>

      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="136" y="118"/>
        <di:waypoint x="200" y="120"/>
      </bpmndi:BPMNEdge>

      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="300" y="120"/>
        <di:waypoint x="350" y="120"/>
      </bpmndi:BPMNEdge>

      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <di:waypoint x="450" y="120"/>
        <di:waypoint x="500" y="120"/>
      </bpmndi:BPMNEdge>

      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="600" y="120"/>
        <di:waypoint x="650" y="118"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`,M={__name:"BpmnContainerView",setup(l){const e=o(B),p=o("UserTask_2"),a=o(["StartEvent_1","UserTask_1"]),d=o(["Flow_1","Flow_2"]);function i({node:s,result:n}){console.log(`${s.name} 审批结果: ${n?"同意":"拒绝"}`)}return(s,n)=>(_(),c("div",null,[n[0]||(n[0]=r("h2",null,"审批流程演示",-1)),w(g,{xml:e.value,activeNodeId:p.value,completedNodeIds:a.value,completedFlowIds:d.value},null,8,["xml","activeNodeId","completedNodeIds","completedFlowIds"]),w(N,{onApprove:i})]))}};export{M as default};
