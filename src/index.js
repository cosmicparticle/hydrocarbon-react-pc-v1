import 'core-js/es' //用于兼容低版本浏览器
import React from 'react';
import {createRoot} from 'react-dom/client';
import HydrocarbonRouter from './router'
import "./style/common.css"
import "./style/loading.css"
import {loadableReady} from '@loadable/component';
import ProgramConfigJson from "../public/programConfig.json";
import {HydrocarbonService} from "aldehyde";

loadableReady(async () => {
    const root = createRoot(document.getElementById('root'));
    await HydrocarbonService.initProgramConfig(ProgramConfigJson);
    root.render(<HydrocarbonRouter/>)
})

