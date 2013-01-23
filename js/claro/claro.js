		require([
			"dojo",
			"dijit/dijit",
			"dijit/dijit-all",
			"dojo/parser",
			"dojo/date/locale",
			"dojo/data/ItemFileReadStore",
			"dojo/dnd/Source"], function(dojo, dijit){
				// various function ripped out of inline script type=dojo/* blocks
				showDialog = function(){
					var dlg = dijit.byId('dialog1');
					dlg.show();
					// avoid (trying to) restore focus to a closed menu, go to MenuBar instead
					dlg._savedFocus = dojo.byId("header");
				};
				
				showDialogAb = function(){
					var dlg = dijit.byId('dialogAB');
					dlg.show();
					// avoid (trying to) restore focus to a closed menu, go to MenuBar instead
					dlg._savedFocus = dojo.byId("header");
				};

				//var setTextBoxPadding;
				// current setting (if there is one) to override theme default padding on TextBox based widgets
				var currentInputPadding = "";
				
				setTextBoxPadding = function(){
					// summary:
					//		Handler for when a MenuItem is clicked to set non-default padding for
					//		TextBox widgets

					// Effectively ignore clicks on the	 currently checked MenuItem
					if(!this.get("checked")){
						this.set("checked", true);
					}

					// val will be "theme default", "0px", "1px", ..., "5px"
					var val = this.get("label");

					// Set class on body to get requested padding, and remove any previously set class
					if(currentInputPadding){
						dojo.removeClass(dojo.body(), currentInputPadding);
						currentInputPadding = "";
					}
					if(val != "theme default"){
						currentInputPadding = "inputPadding" + val.replace("px", "");
						dojo.addClass(dojo.body(), currentInputPadding);
					}

					// Clear previously checked MenuItem (radio-button effect).
					dojo.forEach(this.getParent().getChildren(), function(mi){
						if(mi != this){
							mi.set("checked", false);
						}
					}, this);
				};

				logStrayGlobals = function(){
					// summary:
					//		Print all the global variables that we've created [by mistake] inside of dojo
					var strayGlobals = [];
					for(var i in window){
						if(!window.__globalList[i]){
							strayGlobals.push(i);
						}
					}
					if(strayGlobals.length){
						console.warn("Stray globals: " + strayGlobals.join(", "));
					}
				};
		
				logWidgets = function(){
					// summary:
					//		Print all the widgets to console
					console.log("Widgets in registry:");
					dijit.registry.forEach(function(w){
						console.log(w);
					});
				};
		
				tearDown = function(){
					// summary:
					//		Destroy all widgets, top down, and then check for any orphaned widgets
					dijit._destroyAll();
					logWidgets();
				};
		
				dojo.ready(function(){
					var loadCompleteTime = +new Date();
					console.log("Total load time: " + (loadCompleteTime - startTime) + "ms");
		
					dojo.parser.parse(dojo.byId('container'));
					console.info("Total parse time: " + (+new Date() - loadCompleteTime) + "ms");
		
					dojo.byId('loaderInner').innerHTML += " done.";
					setTimeout(function hideLoader(){
						dojo.fadeOut({ 
							node: 'loader', 
							duration:500,
							onEnd: function(n){
								n.style.display = "none";
							}
						}).play();
					}, 250);
		
					logStrayGlobals();
		
					// Fill in menu/links to get to other themes.		
					// availableThemes[] is just a list of 'official' dijit themes, you can use ?theme=String
					// for 'un-supported' themes, too. (eg: yours)
					var availableThemes = [
						{ theme:"claro", author:"Dojo", baseUri:"../themes/" },
						{ theme:"tundra", author:"Dojo", baseUri:"../themes/" },
						{ theme:"soria", author:"nikolai", baseUri:"../themes/" },
						{ theme:"nihilo", author:"nikolai", baseUri:"../themes/" }
					];
		
					var tmpString='';
					dojo.forEach(availableThemes,function(theme){
						tmpString += 
							'<a href="?theme='+theme.theme+'">'+theme.theme+'</'+'a> (' +
							'<a href="?theme='+theme.theme+'&dir=rtl">RTL</'+'a> ' +
							'<a href="?theme='+theme.theme+'&a11y=true">high-contrast</'+'a> ' +
							'<a href="?theme='+theme.theme+'&dir=rtl&a11y=true">RTL+high-contrast</'+'a> )' +
							' - by: '+theme.author+' <br>';
						dijit.byId('themeMenu').addChild(new dijit.MenuItem({
							label: theme.theme,
							onClick: function(){ location.search = "?theme=" + theme.theme; }
						}))
					});
					dojo.byId('themeData').innerHTML = tmpString;
				});
		
				dojo.ready(function(){
					// It's the server's responsibility to localize the date displayed in the (non-edit) version of an InlineEditBox,
					// but since we don't have a server we'll hack it in the client
					dijit.byId("backgroundArea").set('value', dojo.date.locale.format(new Date(2005, 11, 30), { selector: 'date' }));
		
					var nineAm = new Date(0);
					nineAm.setHours(9);
					dijit.byId("timePicker").set('value', dojo.date.locale.format(nineAm, { selector: 'time' }));
				});
		
				/***
				dojo.ready(function(){
					// use "before advice" to print log message each time resize is called on a layout widget
					var origResize = dijit.layout._LayoutWidget.prototype.resize;
					dijit.layout._LayoutWidget.prototype.resize = function(mb){
						console.log(this + ": resize({w:"+ mb.w + ", h:" + mb.h + "})");
						origResize.apply(this, arguments);
					};
		
					// content pane has no children so just use dojo's builtin after advice
					dojo.connect(dijit.layout.ContentPane.prototype, "resize", function(mb){
						console.log(this + ": resize({w:"+ mb.w + ", h:" + mb.h + "})");
					});
				});
				***/
			});
