define(["dojo/dom", "dojo/domReady","dijit/layout/TabContainer","dijit/layout/ContentPane"],function(dom, ready, TabContainer, ContentPane){
	ready(function(){
		var tabs = [
			{
				  title	: 'API access'
			        , sub	: [
			        	{
						  title		: 'All'
						, content	: 'Manage your list of Redmine instancies here.'
					}
			        	, {
						  title		: 'Company One'
						, content	: 'Your Redmine API key and URL for accessing Redmine at Company One'
					}
					, {
						  title		: 'Company Two'
						, content	: 'API key, URL for Company Two'
					}
				]
			}
			, {
				  title	: 'General'
				, sub	: [
					{
						  title		: 'My 3rd inner'
						, content	: 'Vivamus orci massa rhoncus a lacinia'
					}
					, {
						  title		: 'My 4th inner'
						, content	: 'Fusce sed orci magna, vitae aliquet quam'
					}
				]
 			}
 			, {
				  title	: 'Notifications'
				, sub	: [
					{
						  title		: 'Sound'
						, content	: 'Vivamus orci massa rhoncus a lacinia'
					}
					, {
						  title		: 'Popup'
						, content	: 'Fusce sed orci magna, vitae aliquet quam'
					}
					, {
						  title		: 'Desktop'
						, content	: 'Fusce sed orci magna, vitae aliquet quam'
					}
				]
			}
		];

		var tabContainer = new TabContainer(
			{
				  tabPosition	: "left-h"
				, tabStrip	: true
				, doLayout	: false
			}
			, 'tabContainer'
		);

    dojo.forEach(tabs, function(tab){
        if(!tab.sub.length){
            var cp = new ContentPane({
                title: tab.title,
                content: 'No sub tabs'
            });
            tabContainer.addChild(cp);
            return;
        }
        var subTab = new TabContainer({
            title: tab.title,
            doLayout: false,
            nested: true,
            closable: true,
            onClose: function(){
            	return confirm("Close this for real?");
            }
        });
        dojo.forEach(tab.sub, function(sub){
            var cp = new ContentPane({
                title: sub.title,
                content: sub.content
            });
            subTab.addChild(cp);
        });
        tabContainer.addChild(subTab);
    });
    // _Container widgets will call startup on their children already
    tabContainer.startup();
});

})
