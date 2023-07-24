export function onBtnClicked(
  state,
  dispatch,
  setCurrentStyle,
  setButtonStyle,
  e,
  text
) {
  e.stopPropagation();

  const btnClicked = e.target.name;

  switch (btnClicked) {
    case "bold":
      dispatch({ type: "activate_bold" });

      if (state.boldButton) {
        setCurrentStyle("");
        setButtonStyle((prev) => {
          return { ...prev, boldButtonStyle: "" };
        });
      } else {
        setCurrentStyle("font-bold");
        setButtonStyle((prev) => {
          return { ...prev, boldButtonStyle: "bg-gray-600" };
        });
      }
      break;

    case "italics":
      dispatch({ type: "activate_italics" });

      if (state.italicsButton) {
        setCurrentStyle("");
        setButtonStyle((prev) => {
          return { ...prev, italicsButtonStyle: "" };
        });
      } else {
        setCurrentStyle("italic");
        setButtonStyle((prev) => {
          return { ...prev, italicsButtonStyle: "bg-gray-600" };
        });
      }
      break;

    case "strikeThrough":
      dispatch({ type: "activate_strikeThrough" });

      if (state.strikeThrough) {
        setCurrentStyle("");
        setButtonStyle((prev) => {
          return { ...prev, strikeThroughButtonStyle: "" };
        });
      } else {
        setCurrentStyle("line-through");
        setButtonStyle((prev) => {
          return { ...prev, strikeThroughButtonStyle: "bg-gray-600" };
        });
      }
      break;

    case "addLink":
      dispatch({ type: "activate_hyperLink" });

      if (state.hyperLinkButton) {
        setCurrentStyle("");
        setButtonStyle((prev) => {
          return { ...prev, hyperLinkButtonStyle: "" };
        });
      } else {
        setCurrentStyle("text-blue-600 underline cursor-pointer");
        setButtonStyle((prev) => {
          return { ...prev, hyperLinkButtonStyle: "bg-gray-600" };
        });
      }
      break;

    case "addQuotes":
      dispatch({ type: "activate_blockQuote" });

      if (state.blockQuoteButton) {
        if (
          text.current.value.startsWith('"') &&
          text.current.value.endsWith('"')
        ) {
          text.current.value = text.current.value.substring(
            1,
            text.current.value.length - 1
          );
        } else {
          text.current.value;
        }
        setButtonStyle((prev) => {
          return { ...prev, blockQuoteStyle: "" };
        });
      } else {
        text.current.value = '"' + text.current.value + '"';
        setButtonStyle((prev) => {
          return { ...prev, blockQuoteStyle: "bg-gray-600" };
        });
      }
      break;

    case "addNumbers":
      dispatch({ type: "activate_numberList" });

      if (state.numberedListButton) {
        let userVal = text.current.value.toString();
        const valuesArray = userVal.split("\n");
        const finalValue = [];
        for (let index in valuesArray) {
          const purifiedString = valuesArray[parseInt(index)];
          if (purifiedString.startsWith(`${parseInt(index) + 1}.`)) {
            finalValue.push(
              purifiedString.replace(`${parseInt(index) + 1}.`, "")
            );
          } else {
            finalValue.push(purifiedString);
          }
        }
        text.current.value = finalValue.join("\n");

        setButtonStyle((prev) => {
          return { ...prev, numberedListButtonStyle: "" };
        });
      } else {
        let userVal = text.current.value.toString();
        const valuesArray = userVal.split("\n");
        const finalValue = [];

        for (let index in valuesArray) {
          finalValue.push(`${parseInt(index) + 1}.${valuesArray[index]}`);
        }

        text.current.value = finalValue.join("\n");

        setButtonStyle((prev) => {
          return { ...prev, numberedListButtonStyle: "bg-gray-600" };
        });
      }
      break;

    case "addBullets":
      dispatch({ type: "activate_bulletList" });

      if (state.bulletListButton) {
        let userVal = text.current.value.toString();
        const valuesArray = userVal.split("\n");
        const finalValue = [];
        for (let index in valuesArray) {
          const purifiedString = valuesArray[parseInt(index)];
          if (purifiedString.startsWith(`•`)) {
            finalValue.push(purifiedString.replace(`•`, ""));
          } else {
            finalValue.push(purifiedString);
          }
        }
        text.current.value = finalValue.join("\n");

        setButtonStyle((prev) => {
          return { ...prev, bulletListButtonStyle: "" };
        });
      } else {
        let userVal = text.current.value.toString();
        const valuesArray = userVal.split("\n");
        const finalValue = [];

        for (let index in valuesArray) {
          finalValue.push(`• ${valuesArray[index]}`);
        }

        text.current.value = finalValue.join("\n");

        setButtonStyle((prev) => {
          return { ...prev, bulletListButtonStyle: "bg-gray-600" };
        });
      }
      break;

    case "uploadFile":
      dispatch({ type: "activate_fileUpload" });

      if (state.fileUploadButton) {
        setButtonStyle((prev) => {
          return { ...prev, fileUploadButtonStyle: "" };
        });
      } else {
        setButtonStyle((prev) => {
          return { ...prev, fileUploadButtonStyle: "bg-gray-600" };
        });
      }
      break;

    case "addEmoji":
      dispatch({ type: "activate_emoji" });

      if (state.emojiButton) {
        setButtonStyle((prev) => {
          return { ...prev, emojiButtonStyle: "" };
        });
      } else {
        setButtonStyle((prev) => {
          return { ...prev, emojiButtonStyle: "bg-gray-600" };
        });
      }
      break;

    case "addMention":
      dispatch({ type: "activate_mentionSomeone" });

      if (state.mentionSomeoneButton) {
        setButtonStyle((prev) => {
          return { ...prev, mentionSomeoneButtonStyle: "" };
        });
      } else {
        setButtonStyle((prev) => {
          return { ...prev, mentionSomeoneButtonStyle: "bg-gray-600" };
        });
      }
      break;

    default:
      break;
  }
}
