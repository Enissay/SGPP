/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

	export class HideEnteredGiveaways implements SteamGiftsModule {

		style = "";

		init(): void {
		}

		render = () => {
            $("div.giveaway__row-outer-wrap").each((i: number, el: Element) => {
                this.removeGiveaway(el);
            });

            SGPP.on("EndlessScrollGiveaways", "addItem", (event: JQueryEventObject, el: Element) => {
                this.removeGiveaway(el);
			});
        }

        removeGiveaway(el: Element): void {
            if ($(el).children("div.giveaway__row-inner-wrap").hasClass("is-faded")) {
                $(el).remove(); // or hide()
                console.log( "===> " + $(el).find("h2.giveaway__heading").text().trim() + " REMOVED !" );
            }
        }

		name(): string {
			return "Hide/Remove entered giveaways";
		}

		shouldRun = (location: SGLocation) => true;
		//shouldRun = (location: SGLocation) => location.pageKind == 'giveaway';
	}
}
