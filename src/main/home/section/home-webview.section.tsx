import React from "react";
import { observer } from "mobx-react";
import { container } from "tsyringe";
import HomeStore from "../home.store";
import BottomSlideModal from "../../../shared/component/modal/bottom-slide.modal";
import _ from "lodash";
import { WebView } from 'react-native-webview';

@observer
class HomeWebviewSection extends React.Component<any, any> {

    private _homeStore = container.resolve(HomeStore);

    render() {

        return (
            <>
                <BottomSlideModal
                    isOpen={this._homeStore.isWebViewShown}
                    onClosed={() => {
                        this._homeStore.isWebViewShown = false
                        this._homeStore.selectedLink = '';
                    }}
                    title={"Detail Image"}
                >
                    {this._homeStore.selectedLink !== '' &&
                        <WebView source={{ uri: this._homeStore.selectedLink }} />
                    }
                </BottomSlideModal>
            </>
        );
    }
}

export default HomeWebviewSection;