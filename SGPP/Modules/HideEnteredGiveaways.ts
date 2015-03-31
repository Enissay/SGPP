/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

	export class HideEnteredGiveaways implements SteamGiftsModule {

		style = "";

		init(): void {
		}

		render(): void {
            $("div.giveaway__row-outer-wrap").each((i: number, el: Element) => {
                this.removeGiveaway(el);
            });

			SGPP.on("EndlessScrollGiveaways", "addItem", (el: Element) => {
                //do stuff with the giveaway here
                SGPP.log("###xyx####[" + $(el).html + "]"); // function (a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)}
                SGPP.log("###xxx####" + $(el).attr("class") + " # " + $(el).attr("tagName"));   // undefined
                SGPP.log("###yyy####" + $(el).prop("class") + " # " + $(el).prop("tagName"));   // undefined
			});

        }

        removeGiveaway(el: Element): void {
            if ($(el).children("div.giveaway__row-inner-wrap").hasClass("is-faded")) {
                $(el).remove(); // or hide()
            }
        }

		name(): string {
			return "Hide/Remove entered giveaways";
		}

		shouldRun = (location: SGLocation) => true;
		//shouldRun = (location: SGLocation) => location.pageKind == 'giveaway';
	}
}
