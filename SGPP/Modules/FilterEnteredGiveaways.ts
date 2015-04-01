/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

	export class FilterEnteredGiveaways implements SteamGiftsModule {

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

        removeGiveaway = (el: Element) => {
            if ($(el).children("div.giveaway__row-inner-wrap").hasClass("is-faded")) {
                $(el).hide(); // or hide()
            }
        }

		name(): string {
			return "Hide/Remove entered giveaways";
		}

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaways';
	}
}
