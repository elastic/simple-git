import { Context } from '../interfaces/context';
import { AddResponse } from '../responses';
import { ApiOptions } from '../interfaces/api-options';
import { optionsToCommandArray } from '../util/options';
import { TagListResponse } from '../responses/tag-list.response';
import { l10n, LocaleTokens } from '../responses/locals';

/**
 *
 * Add an annotated tag to the head of the current branch
 *
 */
export async function addAnnotatedTag (context: Context,
                           tagName: string,
                           tagMessage: string) {

   return await context.exec(
      ['tag', '-a', '-m', tagMessage, tagName]
   );

}

/**
 * Call any `git tag` function with arguments passed as an array of strings.
 *
 */
export async function tag (context: Context,
                           options: string[]) {

   return await context.exec(
      ['tag', ...options]
   );

}

/**
 * List all tags. When using git 2.7.0 or above, include an options object with `"--sort": "property-name"` to
 * sort the tags by that property instead of using the default semantic versioning sort.
 *
 * Note, supplying this option when it is not supported by your Git version will cause the operation to fail.
 *
 */
export async function tags (context: Context,
                           options: ApiOptions) {

   const args = ['tag', '-l', ...optionsToCommandArray(options)];
   const hasCustomSort = args.some(function (option) {
      return l10n[LocaleTokens.TAG_SORT].test(option);
   });

   return TagListResponse.parse(await context.exec(args), hasCustomSort);

}