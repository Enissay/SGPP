/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition{

    export class RemoveRowsImIn implements SteamGiftsModule {

        style = "";

        init(): void {
        }

        render(): void {
            var gameRow = $("div.giveaway__row-outer-wrap");

            gameRow.each(function() {
                
                // Remove GA i'm already in
                if ($(this).children("div.giveaway__row-inner-wrap").hasClass("is-faded")) {
                    $(this).remove(); // or hide()
                }
            }
        }

        name(): string {
            return "Remove Rows I'm In";
        }

        shouldRun = (location: SGLocation) => true;
        //shouldRun = (location: SGLocation) => location.pageKind == 'giveaway';
    }

}
