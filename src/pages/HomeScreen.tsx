import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomLoader from "../components/CustomLoader";
import { styles } from "../utils/styles";
import ytdl from "react-native-ytdl";
import RNFS from "react-native-fs";
import { Routes } from "../utils/Routes";

const HomeScreen: React.FC = (props: any) => {
  const { navigation } = props;
  const [inputVal, setInputVal] = useState<string>("");
  const [filesList, setFilesList] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [downloadingFile, setDownloadingFile] = useState<any>();

  const downloadFile = async () => {
    try {
      setLoader(true);
      const validator =
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
      const isValidate = validator.test(inputVal);
      console.log("isValidate", isValidate);
      if (!isValidate) {
        setLoader(false);
        setShowError(true);
        return;
      }
      const response = await ytdl.getInfo(inputVal);
      const format = await ytdl.chooseFormat(response.formats, {
        quality: "18",
      });
      setInputVal("");
      const videoName = response?.videoDetails?.title;
      const videoUrl = format.url;
      const fileName = `${videoName}.mp4`;
      const filePath = `${RNFS.LibraryDirectoryPath}/media/${fileName}`;

      const options = {
        fromUrl: videoUrl,
        toFile: filePath,
        background: true,
        discretionary: true,
        begin: (res: any) => null,
        progress: (res: any) => {
          const file = {
            name: fileName,
            progress: ((res.bytesWritten / res.contentLength) * 100).toFixed(0),
          };
          setDownloadingFile(file);
        },
      };
      const isExists = await RNFS.exists(filePath);
      setLoader(false);
      if (isExists) {
        return Alert.alert(`The video ${fileName} already exists`);
      }
      const res = await RNFS.downloadFile(options).promise.then((response) => {
        console.log("response", response);
        setDownloadingFile(undefined);
        readFiles();
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  useEffect(() => {
    readFiles();
  }, []);

  const readFiles = async () => {
    const directoryPath = `${RNFS.LibraryDirectoryPath}/media/`;
    let existDir = await RNFS.exists(directoryPath).then((boolean) => boolean);
    if (!existDir) await RNFS.mkdir(directoryPath);

    RNFS.readdir(directoryPath)
      .then((files) => {
        const newFiles = files.map((value: string, index: number) => ({
          name: value,
          id: index,
        }));

        setFilesList(newFiles);
      })
      .catch((error) => {
        console.log("Error reading directory:", error);
      });
  };

  const deleteFile = async (item: any) => {
    try {
      const filePath = `${RNFS.LibraryDirectoryPath}/media/${item.name}`;
      await RNFS.unlink(filePath);
      readFiles();
    } catch (err: any) {
      Alert.alert(`Error deleting file "${item.name}": ${err?.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <CustomLoader showLoader={loader} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ margin: 20 }}>
            <Text style={styles.logo}>My Videos</Text>
            <View style={styles.inputWrap}>
              <TextInput
                value={inputVal}
                onChangeText={(text: string) => setInputVal(text)}
                onFocus={() => setShowError(false)}
                style={styles.inputStyle}
                placeholder="*Enter / Paste your Youtube URL"
              />
              {showError && (
                <Text style={styles.errorText}>
                  *Not a valid URL, please check
                </Text>
              )}
              <TouchableOpacity
                style={[
                  styles.downloadBtn,
                  { opacity: downloadingFile?.name ? 0.5 : 1 },
                ]}
                onPress={() => downloadFile()}
                disabled={downloadingFile?.name}
              >
                <Text style={styles.downloadText}>DOWNLOAD</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hLine} />
            <Text style={styles.subhead}>Downloaded Videos</Text>

            {downloadingFile?.name && (
              <View style={styles.fileCard}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {downloadingFile.name}
                </Text>
                <Text style={styles.delBtn}>{downloadingFile.progress}%</Text>
              </View>
            )}

            <FlatList
              data={filesList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={styles.fileCard}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(Routes.VIDEO, {
                          selectedVideo: item,
                        })
                      }
                    >
                      <Text style={styles.delBtn}>PLAY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteFile(item)}>
                      <Text style={styles.delBtn}>DEL</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
