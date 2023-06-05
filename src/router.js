import React from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'
import loadable from '@loadable/component';
import { Spin} from "antd";
import {ProgramConfig,MainPage,HCWelcome,Loginit,LtmplRoute,DtmplRoute,ExcelImportRoute,HCCustomPageRouter,ContextSetter} from 'aldehyde'

const Loading = <Spin tip="Loading...">
</Spin>
const App = loadable(() =>
    import("./App"), {fallback: Loading});

export default class HydrocarbonRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Routes>
                        <Route path="login" element={<Loginit />}  />
                         <Route path="login/:programCode" element={<Loginit />} />
                        <Route path="context-setter" element={<ContextSetter />} />
                        <Route path='*' element={
                            <MainPage>
                                    <Routes>
                                        <Route path='/home' element={ProgramConfig.getCustomPage(ProgramConfig.programCode())? React.createElement(ProgramConfig.getCustomPage(ProgramConfig.programCode())): <HCWelcome/>
                                        }> </Route>
                                        <Route path='/home/:programCode' element={ProgramConfig.getCustomPage(ProgramConfig.programCode())? React.createElement(ProgramConfig.getCustomPage(ProgramConfig.programCode())): <HCWelcome/>
                                        }> </Route>
                                        <Route path="/page/:sourceId/:pageName"
                                               element={<HCCustomPageRouter />} exact/>
                                        <Route path="/:sourceId/act-table"
                                               element={ <LtmplRoute  />} exact/>
                                        <Route path="/:sourceId/detail-view"
                                               element={<DtmplRoute />} exact/>
                                        <Route path="/:sourceId/detail-edit"
                                               element={<DtmplRoute />} exact/>
                                        <Route path="/:sourceId/importer"
                                               element={ <ExcelImportRoute/>} exact/>
                                </Routes>
                            </MainPage>
                        }/>
                    </Routes>
                </App>
            </HashRouter>
        )
    }
}

