/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class HideEnteredGiveaways implements SteamGiftsModule {

        style = "";

        init(): void {
        }

        render(): void {
            console.log("WTF");

            $("div.giveaway__row-outer-wrap").each(function() {
                if ($(this).children("div.giveaway__row-inner-wrap").hasClass("is-faded")) {
                    $(this).remove(); // or hide()
                }
            }
        }

        name(): string {
            return "Hide/Remove entered giveaways";
        }

        //shouldRun = (location: SGLocation) => true;
        shouldRun = (location: SGLocation) => location.pageKind == 'giveaway';
    }
}
