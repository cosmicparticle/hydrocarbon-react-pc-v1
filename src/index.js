import 'core-js/es' //用于兼容低版本浏览器
import React from 'react';
import {createRoot} from 'react-dom/client';
import HydrocarbonRouter from './router'
import "./style/common.css"
import "./style/loading.css"
import {loadableReady} from '@loadable/component';
import ProgramConfigJson from "../public/programConfig.json";
import {ProgramConfig} from 'aldehyde';
import Welcome from './components/welcome';

loadableReady(() => {
    const root = createRoot(document.getElementById('root'));
    ProgramConfig.setHydrocarbonServer(ProgramConfigJson.hydrocarbonServer);
    ProgramConfig.setProgramCode(ProgramConfigJson.programCode)
    ProgramConfig.setProgramName(ProgramConfigJson.programName)
    ProgramConfig.setProgramName_NavLeft(ProgramConfigJson.programName_NavLeft)
    ProgramConfig.setCustomPage(ProgramConfigJson.programCode, Welcome);
    root.render(<HydrocarbonRouter/>)
})

