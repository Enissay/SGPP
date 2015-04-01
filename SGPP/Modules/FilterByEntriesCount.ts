/// <reference path="../ModuleDefinition.ts" />

module ModuleDefinition {

    export class FilterByEntriesCount implements SteamGiftsModule {
        lowAcceptedlimit_EntriesPerCopy = 100;
        highAcceptedLimit_EntriesPerCopy = 250;
        lowAcceptedlimit_Color = "#66FF66";
        highAcceptedLimit_Color = "#66FFCC"; 

        style = "";

        init(): void {
        }

        render = () => {
            console.log("FilterByEntriesCount - render");
            
            // Each visible giveaway
            $("div.giveaway__row-outer-wrap:visible").each((i: number, el: Element) => {
                this.applyColors(el);
            });

            SGPP.on("EndlessScrollGiveaways", "addItem",(event: JQueryEventObject, el: Element) => {
                this.applyColors(el);
            });
        }

        applyColors = (el: Element) => {
            if ( !$(el).children("div.giveaway__row-inner-wrap").hasClass("is-faded") ) {
                var gameNameNode = $(el).find("h2.giveaway__heading > a.giveaway__heading__name");
                var nbrEntries = parseInt($(el).find("div.giveaway__links > a[href$=entries] > span").text().replace(/\D+/g, ""));
                var nbrCopies = 1;
                var remainingTimeNode = $(el).find("div.giveaway__columns > div:nth-child(1) > span");
            
                // If more copies available => get count
                var copiesTemp = $(el).find("h2.giveaway__heading > span.giveaway__heading__thin:contains('Copies')").text();
                if (copiesTemp.length > 0) {
                    nbrCopies = parseInt((/\d+/.exec(copiesTemp))[0]);
                }

                var entryRatio = nbrEntries / nbrCopies;

                // If row matches limits => COLORIFY
                if (entryRatio <= this.lowAcceptedlimit_EntriesPerCopy) {
                    $(el).css("background", this.lowAcceptedlimit_Color);
                }
                else if (entryRatio <= this.highAcceptedLimit_EntriesPerCopy && entryRatio > this.lowAcceptedlimit_EntriesPerCopy) {
                    $(el).css("background", this.highAcceptedLimit_Color);
                }

                // Add entry/copy stats
                if (!$(el).find(".entry_per_copy_count").length && nbrCopies > 1) {
                    var entryStats = $("<span></span>").addClass("giveaway__heading__thin").addClass("entry_per_copy_count").text("(" + Math.round(entryRatio) + " entry per copy)"); //.attr("id", "entry_per_copy_count")
                    gameNameNode.parent().append(entryStats);
                }
            }
        }

        name(): string {
            return "Hide/Remove giveaways by entries count";
        }

        shouldRun = (location: SGLocation) => location.pageKind == 'giveaways';
    }
}
