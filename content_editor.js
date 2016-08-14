$(document).ready(function(){

  var allowed = {

  }

  var ContentEditorConfig = {
    mainConfig: {
      fileDirectory: window.location
    },
    elementConfig: {
      outputElement: "#page", // Iframe element
      outputTitle: "#pageTitle",
      onHoverBorder: "2px solid blue"
    },
    classConfig: {
      classPrefixes: "bluescript-"
    }
  }
  var ContentEditor = (function() {
    if(typeof ContentEditorConfig.elementConfig.outputElement === "undefined"){
      return false;
    }

    var outputElement = ContentEditorConfig.elementConfig.outputElement;
    var onHoverBorder = ContentEditorConfig.elementConfig.onHoverBorder;
    var classPrefix = ContentEditorConfig.classConfig.classPrefixes;
    var events = {
      fileName: "",
      fileContent: "",
      setName: function(fileName){
        if(typeof ContentEditorConfig.mainConfig.fileDirectory !== "undefined"){
          this.fileName = ContentEditorConfig.mainConfig.fileDirectory + fileName;
        } else { this.fileName = fileName; }
      },
      loadContent: function(fileName){
        events.setName(fileName);
        $(outputElement).attr("src", events.fileName);
      }
    }
    var controls = {
      clickedElement: "",
      prefixCheck: function(c){
        return (c.indexOf(classPrefix) !== -1) ? true : false;
      },
      bindUIActions: (function(){
        $(outputElement).on("load", function(){
          $(outputElement).contents().find("*").on("click", function(e){
            e.stopImmediatePropagation();
            if(typeof $(this).attr("class") !== "undefined"){
              if(controls.prefixCheck($(this).attr("class"))){
                alert($(this).html());
              }
            }
          });
          $(outputElement).contents().find("*").mouseenter(function(e){
            e.stopImmediatePropagation();
            if(typeof $(this).attr("class") !== "undefined"){
              if(controls.prefixCheck($(this).attr("class"))){
                $(this).css({
                  outline: onHoverBorder,
                  cursor: "pointer"
                });
              }
            }
          }).mouseleave(function(e){
            e.stopImmediatePropagation();
            $(this).css({
              outline: "none",
              cursor: "default"
            });
          });
        });
      })()

    }

    return {
      loadContent: events.loadContent,
    }

  })();


  ContentEditor.loadContent("hello.php");


});
