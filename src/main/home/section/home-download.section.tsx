import React from "react";
import { Text } from "react-native";
import { observer } from "mobx-react";
import { container } from "tsyringe";
import HomeStore from "../home.store";
import BottomSlideModal from "../../../shared/component/modal/bottom-slide.modal";
import ImageCardComponent from "../../../shared/component/card/image.card";
import _ from "lodash";
import MasonryList from '@react-native-seoul/masonry-list';
import { scaledHorizontal, scaledVertical } from "../../../shared/helper/scale.helper";
import { getAllSavedImage, deleteImageById } from "../../../database/flickr-image.database";
import NotFoundSection from "../../../shared/component/section/not-found.section";

@observer
class HomeDownloadSection extends React.Component<any, any> {

    private _homeStore = container.resolve(HomeStore);

    deleteImageById = async (id) => {
        await deleteImageById(id);
        this._homeStore.dataSavedImages = await getAllSavedImage();
    }

    renderCard = ({ item }) => {
        return (
            <ImageCardComponent
                key={_.get(item, 'link')}
                item={item}
                onPressWeb={(link) => {
                    this._homeStore.selectedLink = link;
                    this._homeStore.isWebViewShown = true;
                }}
                onPressDelete={(id) => {
                    this.deleteImageById(id);
                }}
            />
        );
    }

    render() {
        const dataSavedImages = this._homeStore.dataSavedImages;

        return (
            <>
                <BottomSlideModal
                    isOpen={this._homeStore.isDownloadShown}
                    onClosed={() => {
                        this._homeStore.isDownloadShown = false;
                    }}
                    title={"Loved Image"}
                >
                    {dataSavedImages.length === 0 ?
                        <NotFoundSection 
                            title={'Data Image not Found'}
                            description={'no image loved on this device\n:('}
                        />
                        :
                        <MasonryList
                            data={dataSavedImages.slice()}
                            onRefresh={() => { this._homeStore.doRefresh() }}
                            refreshing={this._homeStore.isLoading}
                            keyExtractor={item => item.id}
                            renderItem={this.renderCard}
                            numColumns={2}
                            contentContainerStyle={{
                                paddingHorizontal: scaledHorizontal(30),
                                paddingTop: scaledVertical(20),
                                paddingBottom: scaledVertical(50)
                            }}
                        />
                    }
                </BottomSlideModal>
            </>
        );
    }
}

export default HomeDownloadSection;